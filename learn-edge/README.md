# ![alt text](../images/apigee-logo.png "Apigee Logo")

## Learn Edge

The Learn Edge series is a hands-on learning experience for beginning Edge developers. Each example is designed to be quick and easy to do, teaches a core Apigee Edge concept or technique, and follows three basic steps:

1. Deploy it.
2. Run it.
3. Trace it.

The best way to learn Apigee Edge is by doing!

### Recommended order of examples

This is the recommended path through the examples. But you can do them in any order you wish. Each sample can be deployed and run independently:

1. [simplest-proxy](./simplest-proxy/README.md)

    >Learn to deploy and call a very simple proxy.

2. [proxy-to-a-target](./proxy-to-a-target/README.md)

    >Get back data from a backend target service.

3. [apikey-security-1](./apikey-security-1/README.md)

    >Secure an API with an API key.

4.  [apikey-security-2](./apikey-security-2/README.md)

    >Prevent an API key from being passed to the backend target service.

4. [fault-handling-1](./fault-handling-1/README.md)

    >Handle a proxy error and return a custom error message.

5. [fault-handling-2](./fault-handling-2/README.md)

    >Learn more about how to do fault handling.

5. [response-cache-1](./response-cache-1/README.md)

    >Speed up your proxy performance with a response cache.

6. [response-cache-2](./response-cache-2/README.md)

    >Set custom response headers to indicate cache hits and misses.

6. [extract-json-payload](./extract-json-payload/README.md)

    >Extract data from a JSON payload and return the data in custom response headers.

7. [extract-json-payload-2](./extract-json-payload-2/README.md)

    >Query for data to extract from a JSON response payload.

7. [extract-xml-payload](./extract-xml-payload/README.md)

    >Extract data from an XML request body and set a custom XML response body.

7. [quota-1](./quota-1/README.md)

    >Set a quota limit on the number of API calls that can be made in a given time period.

8. [service-callout-1](./service-callout-1/README.md)

    > Use the Service Callout policy to call a target service directly. This sample is a refactor of [extract-json-payload](./extract-json-payload/README.md).

8. [service-callout-2](./service-callout-2/README.md)

    > Check the response status from the target service. Throw a custom exception if the HTTP response status is 404. This sample is a refactor of [service-callout-1](./service-callout-1/README.md).


### Prerequisites

1. You need an **Apigee account**. If you don't have an Apigee account, go to [https://login.apigee.com/login](https://login.apigee.com/login), and click Create Account.
2. You must install [apigeetool](https://www.npmjs.com/package/apigeetool). We use apigeetool to deploy the proxies.

    `npm install -g apigeetool`

2. Know the name of your **Edge organization** (typically, you'll use the one that was created when you registered for your Apigee account).
3. Know your **Apigee username** (this is the email address that you gave when you registered for your account).
2. Download or clone the [api-platform-samples](https://github.com/apigee/api-platform-samples) GitHub repo.
6. In a browser, sign in to your [Apigee account](http://apigee.com). It'll be good to keep this browser window open as you work so you can view and trace the Learn Edge proxies in the UI.

**Troubleshooting:** If you've previously tried to run the sample and have
trouble with the script (for example, it's using the wrong organization
or the URL to invoke is incorrect), find and delete `$HOME/.learn-edge.rc`
on your local file system. Then re-deploy the sample.

That's it! To get started, go to the README for the first example proxy, [simplest-proxy](./simplest-proxy), and follow the instructions. On your filesystem, it is in the folder `api-platform-samples/learn-edge/simplest-proxy`.

### What you'll learn

We try not to clutter the lessons with a lot of explanation and background information. Rather, we expect you to learn by doing, by changing things, and fixing problems. When you complete the series, you will understand:

* The basic capabilities of Apigee Edge.
* Core concepts you'll need to be a successful Edge developer. They include security, fault handling, caching, quotas, and others.
* How Edge projects are structured.
* How to do primary Edge development locally, on your laptop, rather than in the UI.
* How to deploy Edge proxies from your laptop to Edge.
* Basic debugging techniques.

**Tip:** If you want to dive deeper into any concept covered in this series, you can go to the [Apigee Edge documentation](http://docs.apigee.com/) and use Search to look up topics (search works very well and even picks up related topics in the [Apigee Community](https://community.apigee.com/index.html)). In a few cases, we'll provide a link if we think it will be especially helpful. You can also check out the Apigee Edge [4-Minute Video](https://www.youtube.com/playlist?list=PLIXjuPlujxxxe3iTmLtgfIBgpMo7iD7fk) series.

### What you won't learn

* A lot of background, text-book style information. You'll learn by deploying and running example code on Apigee Edge. You can always read about features in the official [Apigee Edge documentation](http://docs.apigee.com/).
* All of the possible use cases for Edge.
* All of the features included with Edge.
* All of the possible ways to use the features we introduce.

The goal of this series is to ground you in a few basics so that you can explore on your own using the many sources of information available for Edge, including the documentation, the Apigee Community, samples, and so on. Welcome to Apigee Edge!



