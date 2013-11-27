// This JavaScript gets a list of variables from the context, and then sets them as HTTP headers on the response message. All available flow variables are documented at http://apigee.com/docs/api-platform/api/variables-reference
context.setVariable("response.header.X-Apigee-Demo-Target", context.getVariable("target.name"));
context.setVariable("response.header.X-Apigee-Demo-ApiProxyName", context.getVariable("apiproxy.name"));
context.setVariable("response.header.X-Apigee-Demo-ProxyName", context.getVariable("proxy.name"));
context.setVariable("response.header.X-Apigee-Demo-ProxyBasePath", context.getVariable("proxy.basepath"));
context.setVariable("response.header.X-Apigee-Demo-ProxyPathSuffix", context.getVariable("proxy.pathsuffix"));
context.setVariable("response.header.X-Apigee-Demo-ProxyUrl", context.getVariable("proxy.url"));

//Be sure to run 'deploy.sh' for changes to take effect.