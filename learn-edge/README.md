# Learn Edge by doing

The Learn Edge series is a hands-on, minimalistic learning exprience for beginning Edge developers. Each step is designed to be quick and easy to try and teaches a core concept that all Edge developers must master to be successful with the platform. 

### Recommended order of examples

This is the recommended path through the examples. But you can do them in any order you wish:

1. [simplest-proxy](./simplest-proxy/README.md) - A simple proxy that does nothing!
2. [proxy-to-a-target](./proxy-to-a-target/README.md) - A simple proxy that returns data from a backend target service. 
3. [apikey-security](./apikey-security/README.md) - Make sure the client sends a valid API key.
4. [fault-handling-1](./fault-handling-1/README.md) - Handle an error with a Fault Rule and return a custom error message. 
5. [fault-handling-2](./fault-handling-2/README.md) - Learn more about how Fault Rules work. 
5. [response-cache-1](./response-cache-1/README.md) - Speed up your proxy performance with a response cache. 
6. [response-cache-2](./response-cache-2/README.md) - Set custom response headers to indicate cache hits and misses.
6. [extract-json-payload](./extract-json-payload/README.md) - Set custom response headers with data extracted from a JSON payload.
7. [quota-1](./quota-1/README.md) - Set a quota limit on the number of API calls that can be made in a given time period.

### Prerequisites

1. You need an **Apigee account**. If you don't have an Apigee account, sign up for one now.
2. You must install [apigeetool](https://www.npmjs.com/package/apigeetool). We use apigeetool to deploy the proxies. 

    `npm install -g apigeetool`

2. Know the name of your **Edge organization** (typically, you'll use the one that was created when you registered for you Apigee account)
3. Your **Apigee username** (this is the email address that you gave when you registered for your account)
2. Download or clone the **api-platform-samples repo** on GitHub.
3. Edit this file with your account information (org name, etc):

    `api-platform-samples/tools/setup/setenv.sh`

6. Log in to your Apigee account and go to the API Management section. It'll be good to keep this open as you work, because while you'll mostly be working locally, it's helpful to see how each proxy looks in the UI after you deploy it. 

That's it! To get started, go to the README for the first example proxy, [simplest-proxy](./simplest-proxy). On your filesystem, it is in the folder `api-platform-samples/learn-edge/simplest-proxy`, and follow the instructions.

### What you'll learn

We don't clutter the lessons with a lot of explanation and background information. Rather, we expect you to learn by doing, by changing things, and fixing problems. When you complete the series, you will understand:

* Core concepts you'll need to be a successful Edge developer. They include security, fault handling, caching, and others. 
* What Edge is and some of the most useful things it can do
* How Edge projects are structured 
* How to do primary Edge development locally, on your laptop, rather than in the UI
* How to deploy Edge proxies from your laptop to Edge
* Basic debugging techniques

**Tip:** If you want to dive deeper into any concept covered in this series, you can go to the Edge documentation and use Search to look things up (search works very well and even picks up related topics in the Apigee Community). In a few cases, we'll provide a link if we think it will be especially helpful. 

### What you won't learn

* A lot of background, text-book style information. You'll learn by doing. 
* All of the possible use cases for Edge
* All of the features included with Edge
* All of the possible ways to use the features we introduce

The goal here is to ground you in a few basics so that you can explore on your own using the many sources of information available for Edge, like documentation, Apigee Community, samples repositories, and so on. 



