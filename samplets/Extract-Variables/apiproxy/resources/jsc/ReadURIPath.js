 //-- Get the data for the {id} pattern specified in the Extract Variables policy.
//-- Note that urirequest is the VariablePrefix specified in the policy.
var data = context.getVariable('urirequest.id');

//-- Tell them what demonstrated.
var demoSummary = "Extract value of {id} parsed from the proxypath.suffix: /extract-variables/resource1/{id}.";

//-- Tell them what policy we used.
var policyUsed = "Extract Variables";

//-- Tell them what variable the value was saved in.
var flowVar = 'urirequest.id';

//-- Form the JSON response
var jsonData = { 'Feature demonstrated': demoSummary, 'Data extracted': data, 'Policy demonstrated': policyUsed, 'Flow variable written/read': flowVar };

//-- Set the response. Note that message.content is read/write and always in scope. 
context.setVariable('message.header.Content-Type', "application/json");
context.setVariable('message.content', JSON.stringify(jsonData));
