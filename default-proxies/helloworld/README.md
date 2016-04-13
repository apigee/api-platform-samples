# About this sample

The `helloworld` proxy returns simple text and HTML responses by routing API calls to this target:

http://mocktarget.apigee.net

* When calling the base target URL above (`/v0/hello` in the API proxy), the response is `hello, world`.
* When calling the `/iloveapis` resource (`/v0/hello/iloveapis` in the API proxy), the response is `<h2>I love APIs!</h2>`.

## Deploying the sample

The API proxy source code is in the `/apiproxy` directory. Running `deploy.sh` deploys the API proxy from that directory to your Edge environment.

Alternatively, the `helloworld.zip` file is the zipped API proxy bundle that you can upload to your environment using the Edge management UI or API.