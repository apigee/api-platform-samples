
var conditionStatus = context.getVariable('condition.status');
if (conditionStatus === null | conditionStatus === '') {
    context.setVariable("response.content", "Condition Failed for proxy.pathsuffix: " + context.getVariable("proxy.pathsuffix"));
} else {
    context.setVariable("response.content", conditionStatus + " for proxy.pathsuffix: " + context.getVariable("proxy.pathsuffix"));
}