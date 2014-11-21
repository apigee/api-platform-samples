var json = JSON.parse(context.getVariable("request.content"));

context.setVariable("request.queryparam.response_type",json.response_type);
context.setVariable("request.queryparam.scope",json.scope);
context.setVariable("request.queryparam.redirect_uri",json.redirect_uri);
context.setVariable("request.queryparam.state",json.state);
context.setVariable("request.queryparam.client_id",json.client_id);
context.setVariable("request.queryparam.username",json.username);
context.setVariable("request.content","");
context.setVariable("request.verb", "GET");
