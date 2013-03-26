var targetRequestUrl =
  context.getVariable('target.url') +
  context.getVariable('proxy.pathsuffix');

var req = new Request(targetRequestUrl, 'GET', request.headers);
var exchange = httpClient.send(req);

exchange.waitForComplete();

if (exchange.isSuccess()) {
  var reqResponse = exchange.getResponse();

  if (reqResponse.status == 200) {
    var originalJSON = reqResponse.content.asJSON;
    context.setVariable('json-patch.originalJSON', originalJSON);
  }
}
