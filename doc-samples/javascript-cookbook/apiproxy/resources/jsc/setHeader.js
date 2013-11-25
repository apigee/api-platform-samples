response.setVariable("header.X-Apigee-Demo-Target", flow.getVariable("target.name"));
response.setVariable("header.X-Apigee-Demo-ApiProxyName", flow.getVariable("apiproxy.name"));
response.setVariable("header.X-Apigee-Demo-ProxyName", flow.getVariable("proxy.name"));
response.setVariable("header.X-Apigee-Demo-ProxyBasePath", flow.getVariable("proxy.basepath"));
response.setVariable("header.X-Apigee-Demo-ProxyPathSuffix", flow.getVariable("proxy.pathsuffix"));
response.setVariable("header.X-Apigee-Demo-ProxyUrl", flow.getVariable("proxy.url"));