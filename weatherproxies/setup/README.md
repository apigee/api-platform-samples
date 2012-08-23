# Using these samples

This directory contains setup instructions and scripts for these samples. 

## Files in this directory 

* *FreeProduct.xml*, *CheapProduct.xml*, and *ExpensiveProduct.xml*: 
These are "API Product" definitions that describe how an API is exposed through Apigee.

* *joe.xml*, *thomas.xml:
These are "Developer" definitions that represent developers who use our APIs

* *joe-app.xml*, *thomas-app.xml*:
These are "Application" definitions that describe applications that use the APIs and API Products

* *joe-app-product.xml*, * thomas-app-product.xml*:
These are files that instruct Apigee to associate particular applications to API products.

## Installation Instructions 

First, run "./setup.sh" to install the API products, developers, and apps. It is fairly straightforward
and you can look at it to see how it installs the components above. It will prompt you
for the name of your Apigee organization, username, and password.

Next, use the "deploy.py" script to deploy the API proxies as shown here:

(This script requires Python -- it is present in most Linux environments, on a Mac with XCode
installed, on a Windows machine with Cygwin installed, and in various other places.)

To deploy the "apikey" app (which adds API key validation), run the following from this directory,
filling in your username and password and the name of your Apigee organization below:

    ./deploy.py -n apikeysample -u USERNAME:PASSWORD -o ORGANIZATION -e test -d ../apikey

Do the same to deploy the "oauth" app:

    ./deploy.py -n oauthsample -u USERNAME:PASSWORD -o ORGANIZATION -e test -d ../apikey

## Testing with API keys 

Now, to test the API key app, first take a look at the app that was created to see its client
credentials:

    curl -u USERNAME:PASSWORD https://api.enterprise.apigee.com/v1/o/ORGANIZATION/apps/thomas-app

     {
       "accessType" : "read",
       "appFamily" : "default",
       "attributes" : [ {
       "name" : "DisplayName",
       "value" : "Tom's Weather App"
        } ],
       "callbackUrl" : "",
       "createdAt" : 1345009112912,
       "createdBy" : "your@email",
       "credentials" : [ {
         "apiProducts" : [ {
           "apiproduct" : "FreeProduct",
           "status" : "approved"
          } ],
          "attributes" : [ ],
          "consumerKey" : "xxxxx",
          "consumerSecret" : "yyyyy",
          "status" : "approved"
       } ],
       "lastModifiedAt" : 1345009112912,
       "lastModifiedBy" : "your@email",
       "name" : "thomas-app",
       "status" : "approved"
    }

You'll need the "consumerKey" from above to function as the API key for this sample.

Next, invoke your API proxy as follows:

    curl "http://ORGANIZATION-test.apigee.net/weatherapikey/forecastrss?w=12761326&apikey=xxxxx"

where "xxxx" is the "consumerKey" that you got before. You should again get back a weather forecast
in RSS format.

(Note that if you leave off the "apikey" query parameter, or submit an invalid parameter, you will
get back an error.)

Similarly, notice that using this particular API key, you get a very low quota of two API calls 
per minute -- so after a few requests you will get a quota exception.

However, when we ran the setup script, we created another app for the developer "thomas" 
that has a higher quota. To see this in action, get the "consumerKey" from the other
app that we created and use that, like this:

    curl -u USERNAME:PASSWORD https://api.enterprise.apigee.com/v1/o/ORGANIZATION/apps/joe-app

If you are curious as to how this works, you'll see that both apps are associated with different
API products. You can see the different API product definitions like this:

    curl -u USERNAME:PASSWORD https://api.enterprise.apigee.com/v1/o/ORGANIZATION/apiproducts/FreeProduct
    curl -u USERNAME:PASSWORD https://api.enterprise.apigee.com/v1/o/ORGANIZATION/apiproducts/ExpensiveProduct

## Testing with OAuth 

The OAuth sample is very similar, but instead of using the "API key" pattern it achieves the same thing
using OAuth 2.0. It uses the "client credentials" grant type, which lets the user exchange the
API key for an OAuth token using no other parameters.

To use this sample, you'll need both the consumer key AND the secret that you retrieved above. Assuming 
that you substitute them instead of "xxx" and "yyy" then you can get an OAuth token like this:

    curl 
      -u xxxx:yyyy
      https://ORGANIZATION-test.apigee.net/weatheroauth/oauth/accesstoken 
      -d 'grant_type=client_credentials'

    {
	"issued_at":1345016506911,
	"scope":"READ",
	"application_name":"joe-app",
	"status":"approved",
	"organization_id":0,
	"expires_in":599,
	"api_profile_name":"null",
	"refresh_token":"null",
	"access_token":"zzzzzzz",
	"refresh_count":0
    } 

and once you have that, you can make API calls by including the proper OAuth 2.0 
"Authorization" header, like this:

    curl -H "Authorization: Bearer zzzzz" https://ORGANIZATION-test.apigee.net/weatheroauth/forecastrss?w=12761326

## Testing with OAuth and Authorization Code

OAuth implementations can actually get an access token in one of four ways:

1. Using the username and password directly, passed on the access token request -- this is
called the "username / password" type.
2. By redirecting the user's browser to a special URL that produces an authorization code,
and redirects the user again to a login page. This is designed for web apps that talk
to the API and is called the "authorization code" type.
3. Like number 2 above, but returning a "URL fragment" that is designed for use by 
highly interactive apps built using JavaScript. This is called the "implicit grant" type.
4. Just using the client credentials, which is called the "client credentials" type. That's
what we did in the last step.

In this step, we'll use the authorization code type (number 2).

For this sample, we'll use the proxy in the "oauth-authcode" directory. So we'll
deploy it like this:

    ./deploy.py -n oauthauthcode -u USERNAME:PASSWORD -o ORGANIZATION -e test -d ../oauth-authcode

The first step in authenticating the user and getting the access token is to redirect the
user's web browser to the "login page" supported by the API. We can simulate this using
curl like this:

    curl \
      "https://ORGANIZATION-test.apigee.net/weatheroauthauthcode/oauth/authorize?response_type=code&client_id=xxx&redirect_uri=http://joe.app/login&scope=READ&state=foobar"

In this case, the "client_id" should be the same "consumerId" from "joe-app" that we used in the previous example.

Also, the "redirect_uri" must be the same as the "callbackUrl" that we specified when we created "joe-app."
(See the joe-app.xml file to check.) If it doesn't match, you'll get an error.

This will return a redirect response like this:

    HTTP/1.1 302 Found
    Location: http://joe.app/login?scope=READ&state=foobar&code=zzzzz

In a real OAuth app, this URL would have been invoked by a web browser, which then would have been
redirected to the login page at "joe.app". Writing this login page is part of the API provider's
responsibility. But for testing purposes we can simulate this using curl.

(Note the "state" parameter here -- this is to prevent CSRF attacks and should be unique
for every request. It's not required but highly recommended.)

Now to get the access token, the login page or pages at joe.app would eventually make a POST
back to the proxy, like this:

    curl -u xxxx:yyyy https://ORGANIZATION-test.apigee.net/weatheroauthauthcode/oauth/accesstoken \
      -d 'grant_type=authorization_code&code=zzzzz&redirect_uri=http://joe.app/login'

    {
	"issued_at":1345073930832,
	"scope":"READ",
	"application_name":"joe-app",
	"status":"approved",
	"organization_id":0,
	"expires_in":3599,
	"api_profile_name":"null",
	"refresh_token":"SlE9lNYf",
	"access_token":"I29OwHlGRi1AkbBCIRLLMC5efFgu",
	"refresh_count":0
    }  

And now we can use the access token in our request exactly as we did before:

    curl -H "Authorization: Bearer I29OwHlGRi1AkbBCIRLLMC5efFgu" \
      https://the-brails-test.apigee.net/weatheroauthauthcode/forecastrss?w=12761326

## Testing the Mashup samples

The "mashup1" and "mashup2" samples both do the same thing in two different ways. First, they call
the Google Geocoding web service to turn an international postal code into a latitude and 
longitude, and then the Google Altitude web service to turn the location into an altitude.
They then return the result as JSON.

"mashup1" uses the AssignMessage, ExtractVariables, and ServiceCallout policies to accomplish
this in the proxy using standard XML policy configuration files.

"mashup2" does the same thing, but it does it using a Javascript policy which does all these steps
in one script.

Both work the same way: they take two parameters: "country" is an international US country
code, and "postalcode" is a postal code valid for that country.

For instance:

    curl "http://ORGANIZATION-test.apigee.net/altitude?country=us&postalcode=08008"
    {"country":"us","postalcode":"08008",
     "elevation":{"meters":0.5045232,"feet":1.6552599030345978},
     "location":{"latitude":39.75007129999999,"longitude":-74.1357407}}

    curl "http://ORGANIZATION-test.apigee.net/altitude?country=in&postalcode=560034"
    {"country":"in","postalcode":"560034",
     "elevation":{"meters":887.5546,"feet":2911.9246319354556},
     "location":{"latitude":12.9320617,"longitude":77.6278377}}
