# Sample API proxy and Sharedflow for Performance Benchmarking

This directory contains the sample API proxy and Sharedflow used to performance test Apigee X. This sample proxy has a sample target url configured as (https://mocktarget.apigee.net) and we don't recommeded to use our mocktarget for running performance tests. Please use this as reference to develop your own apiproxy with your own target server to run performance tests to understand the system performance.

**Prerequisites**
We assume this you're already familiar with apigee x and have apigee x setup running and able to build, deploy and test api proxies using different policies. More info [here] (https://cloud.google.com/apigee/docs/getstarted?hl=en)

This API proxy sample required users to create API Product, Developer and App. Users can follow this document to create these entities(https://cloud.google.com/apigee/docs/api-platform/tutorials/secure-calls-your-api-through-api-key-validation)

### Sample use cases
* Validate an API key
* Generate an access token using OAuth policy
* Validate an access token using OAuth policy
* Response Cache
* Spikearrest
* KeyValueMap Operations (GET and POST)
* Quota Operations
* Generate JWT token
* Validate JWT token
* GenerateJWTAccessToken using OAuth policy
* VerifyJWTAccessToken using OAuth policy
* Javascript
* MonetizationLimitsCheck
* RaiseFault
* Graphql parsing
* AssignMessage
* Xslt
* ServiceCallout and Extract Variables
* FlowCallout using a sharedflow
* Passthrough
* NullTarget

**Policy used in this perf proxy sample**

* [Verify API Key policy](https://cloud.google.com/apigee/docs/api-platform/reference/policies/verify-api-key-policy)
* [Spike Arrest policy](https://cloud.google.com/apigee/docs/api-platform/reference/policies/spike-arrest-policy)
* [ServiceCallout policy](https://cloud.google.com/apigee/docs/api-platform/reference/policies/service-callout-policy)
* [RaiseFault policy](https://cloud.google.com/apigee/docs/api-platform/reference/policies/raise-fault-policy)
* [Graphql policy](https://cloud.google.com/apigee/docs/api-platform/reference/policies/graphql-policy)
* [ResponseCache policy](https://cloud.google.com/apigee/docs/api-platform/reference/policies/response-cache-policy)
* [AssignMessage policy](https://cloud.google.com/apigee/docs/api-platform/reference/policies/assign-message-policy)
* [FlowCallout policy](https://cloud.google.com/apigee/docs/api-platform/reference/policies/flow-callout-policy)
* [Javascript policy](https://cloud.google.com/apigee/docs/api-platform/reference/policies/javascript-policy)
* [ExtractVariables policy](https://cloud.google.com/apigee/docs/api-platform/reference/policies/extract-variables-policy)
* [XSLTransform policy](https://cloud.google.com/apigee/docs/api-platform/reference/policies/xsl-transform-policy)
* [GenerateAccessToken OAuthV2 policy](https://cloud.google.com/apigee/docs/api-platform/reference/policies/oauthv2-policy#generateaccesstoken)
* [VerifyAccessToken OAuthV2 policy](https://cloud.google.com/apigee/docs/api-platform/reference/policies/oauthv2-policy#verifyaccesstoken)
* [GenerateJWT policy](https://cloud.google.com/apigee/docs/api-platform/reference/policies/generate-jwt-policy)
* [VerifyJWT policy](https://cloud.google.com/apigee/docs/api-platform/reference/policies/verify-jwt-policy)
* [MonetizationLimitsCheck](https://cloud.google.com/apigee/docs/api-platform/reference/policies/monetization-limits-check-policy)
*[GenerateJWTAccessToken OAuth policy](https://cloud.google.com/apigee/docs/api-platform/security/oauth/using-jwt-oauth#generating-a-jwt-format-token-signed-with-an-hmac-algorithm)
*[VerifyJWTAccessToken OAuth policy](https://cloud.google.com/apigee/docs/api-platform/security/oauth/using-jwt-oauth#verifying-a-jwt-access-token-signed-with-an-hmac-algorithm)
* [CORS policy](https://cloud.google.com/apigee/docs/api-platform/reference/policies/cors-policy)
* [XMLTOJSON policy](https://cloud.google.com/apigee/docs/api-platform/reference/policies/xml-json-policy)

**How to deploy sample api proxy and sharedflow?** 

* Create a zip file for sharedflow sample and deploy it using Apigee apis
```
cd api-platform-samples/perf-proxies/sharedflows/sfassignmessage

zip -r sfassignmessage.zip sharedflowbundle
```
* Get an access token using Google Cloud credentials for accessing Apigee APIs
```
gcloud auth login

export TOKEN=$(gcloud auth print-access-token)
```
* Import sharedflow to an apigee organization (replace ${org_name} with your apigee org name). The curl call should return 200 Ok response.

```
curl -v 'https://apigee.googleapis.com/v1/organizations/${org_name}/sharedflows?action=import&name=sfassignmessage' \
    -X POST \
    -H "Authorization: Bearer $TOKEN" \
    -F "file=@sfassignmessage.zip" \
    -H "Content-Type:multipart/form-data"
```
* Deploy sharedflow to an apigee organization(replace ${org_name} with your apigee org name and ${env_name} with your apigee env name). The curl call should return 200 Ok response.

```
curl -v 'https://apigee.googleapis.com/v1/organizations/${org_name}/environments/${env_name}/sharedflows/sfassignmessage/revisions/1/deployments' \
    -X POST \
    -H "Authorization: Bearer $TOKEN"
```
* Create a zip file for api proxy sample and deploy it using Apigee apis
```
cd api-platform-samples/perf-proxies/perfproxy

zip -r perf.zip apiproxy
```
* Import api proxy to an apigee organization (replace ${org_name} with your apigee org name). The curl call should return 200 Ok response.

```
curl -v 'https://apigee.googleapis.com/v1/organizations/${org_name}/apis?action=import&name=perf' \
    -X POST \
    -H "Authorization: Bearer $TOKEN" \
    -F "file=@perf.zip" \
    -H "Content-Type:multipart/form-data"
```
* Deploy api proxy to an apigee organization(replace ${org_name} with your apigee org name and ${env_name} with your apigee env name). The curl call should return 200 Ok response.

```
curl -v 'https://apigee.googleapis.com/v1/organizations/${org_name}/environments/${env_name}/apis/perf/revisions/1/deployments' \
    -X POST \
    -H "Authorization: Bearer $TOKEN"
```
**Sample API Calls to access the sample use cases**

* Validate an API key

How to get the apikey: https://cloud.google.com/apigee/docs/api-platform/tutorials/secure-calls-your-api-through-api-key-validation?hl=en#addadeveloperandapptoyourorganization-gettheapikey

```
curl -v 'https://YOUR_ENV_GROUP_HOSTNAME/v1/perf?test=validkey&apikey=${yourapikey}'
```
* Generate an access token using OAuth policy
```
curl -v -X POST 'https://YOUR_ENV_GROUP_HOSTNAME/v1/perf/accesstoken?grant_type=client_credentials' -d "client_id=${yourapikey}&client_secret=${yourapisecret}"
```
* Validate an access token using OAuth policy
Get "access_token" value from Generate an access token using OAuth policy call and pass access_token value to below call
```
curl -v -H 'Authorization: Bearer $access_token' 'https://YOUR_ENV_GROUP_HOSTNAME/v1/perf?test=oauth'
```
* Response Cache
```
curl -v 'https://YOUR_ENV_GROUP_HOSTNAME/v1/perf?test=cache&cache=1'
```
* Spikearrest
```
curl -v 'https://YOUR_ENV_GROUP_HOSTNAME/v1/perf?test=spikearrest'
```
* KeyValueMap Operations
```
curl -v 'https://YOUR_ENV_GROUP_HOSTNAME/v1/perf?test=get-put-kvm'
```
* Quota Operations
```
curl -v 'https://YOUR_ENV_GROUP_HOSTNAME/v1/perf?test=test=distributed-quota&quota=id-1'

curl -v 'https://YOUR_ENV_GROUP_HOSTNAME/v1/perf?test=synchronous-distributed-quota&quota=id-1'
```
* Generate & Validate JWT token
```
curl -v 'https://YOUR_ENV_GROUP_HOSTNAME/v1/perf?test=gvjwt&subject=abc'
```
* GenerateJWTAccessToken using OAuth policy
```
curl -v -X POST 'https://YOUR_ENV_GROUP_HOSTNAME/v1/perf/jwtAccessToken?grant_type=password' -d 'client_id=${yourapikey}&client_secret=${yourapisecret}&username=username_a&password=password_a'
```
* VerifyJWTAccessToken using OAuth policy
Get "access_token" value from GenerateJWTAccessToken using OAuth policy call and pass access_token value to below call
```
curl -v -H 'Authorization: Bearer $access_token' https://YOUR_ENV_GROUP_HOSTNAME/v1/perf/?test=verifyJwtAccessToken'
```
* Javascript
```
curl -v 'https://YOUR_ENV_GROUP_HOSTNAME/v1/perf/?test=jsheader'
```
* MonetizationLimitsCheck
```
curl -v 'https://YOUR_ENV_GROUP_HOSTNAME/v1/perf/?test=monetizationlimitscheck&apikey=${yourapikey}'
```
* RaiseFault
```
curl -v 'https://YOUR_ENV_GROUP_HOSTNAME/v1/perf/?test=raisefault'
```
* Graphql parsing
```
curl -v -X POST -H 'Content-Type: application/graphql' 'https://YOUR_ENV_GROUP_HOSTNAME/v1/perf/?test=graphql' --data-raw  'query PROJECTS_EDGES($filters_1: FiltersArgument) { projects { hits(filters: $filters_1) { total  }  } }'
```
* AssignMessage
```
curl -v 'https://YOUR_ENV_GROUP_HOSTNAME/v1/perf/?test=assignmessage'
```
* Xslt
```
curl -v 'https://YOUR_ENV_GROUP_HOSTNAME/v1/perf/?test=xslt'
```
* ServiceCallout
```
curl -v 'https://YOUR_ENV_GROUP_HOSTNAME/v1/perf/?test=sc'
```
* FlowCallout
```
curl -v 'https://YOUR_ENV_GROUP_HOSTNAME/v1/perf/?test=flowcallout'
```
* Passthrough
```
curl -v 'https://YOUR_ENV_GROUP_HOSTNAME/v1/perf/?test=passthrough'
```
* NullTarget
```
curl -v 'https://YOUR_ENV_GROUP_HOSTNAME/v1/perf/?test=nulltarget'
```

The Sample API Proxy is available on the basePath `/v1/perf`