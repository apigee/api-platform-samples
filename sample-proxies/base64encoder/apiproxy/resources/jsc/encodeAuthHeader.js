var username = context.getVariable("request.queryparam.username");
var password = context.getVariable("request.queryparam.password");

var words = CryptoJS.enc.Latin1.parse(username + ":" + password);
var base64 = CryptoJS.enc.Base64.stringify(words);
context.setVariable("encodedAuthHeader","Basic " + base64);