# About this sample

The `helloworld` proxy returns a variety of sample responses by routing API calls to this target:

http://mocktarget.apigee.net (which you can also view in a web browser)

Following are the resources you can call:

* The API proxy BasePath (`/v0/hello`), which maps directly to `http://mocktarget.apigee.net`, returns `Hello, Guest!`.
* `/user` - Returns `Hello, Guest!`
* `/user?user=your_name` - Returns a customized greeting.
* `/iloveapis` - Returns `<H2>I <3 APIs</H2>`
* `/ip` - Returns the client IP address as JSON.
* `/xml` - Returns a sample XML response.
* `/json` - Returns a sample JSON response.
* `/echo` - Returns request headers and the request body as JSON.
* `/help` - Returns a help page of available resources in HTML.

The API proxy includes a Quota policy and an Assign Message policy that provides CORS support.

## Deploying the sample

The API proxy source code is in the `/apiproxy` directory. Running `deploy.sh` deploys the API proxy from that directory to your Edge environment.

Alternatively, the `helloworld.zip` file is the zipped API proxy bundle that you can upload to your environment using the Edge management UI or API. 