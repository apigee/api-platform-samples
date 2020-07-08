var path = context.getVariable("target.url") + "/maps/api/js?" + context.getVariable("request.querystring").replace("%25", "%");
context.setVariable("target.url", path);