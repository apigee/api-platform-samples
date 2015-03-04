
//*** Configure with your org, env, and domain ***//

var organization = "Enter your organization name on Edge";
var environment = "Enter the environment to deploy to on Edge (prod or test)";
var domain = "apigee.net"; // On prem customers might have to change this domain value. Cloud users can leave it unchanged.

//***

//set the url for login page here
var login_url = "https://" + organization + "-" + environment + "." + domain + "/oauth2/app/login";



var client_id = context.getVariable("client_id");
var scope = context.getVariable("request.queryparam.scope");
var state = context.getVariable("request.queryparam.state");
var response_type = context.getVariable("request.queryparam.response_type");

var app = context.getVariable("developer.app.name");

var client_redirect_uri = context.getVariable("request.queryparam.redirect_uri");
var reg_redirect_uri = context.getVariable("verifyapikey.ValidateClientId.app.callbackUrl");
var redirect_uri ="";


//redirect_uri is optional for the request
if (client_redirect_uri != null){
	
	//if redirect_uri from request does not match what is registered for the app, throw a fault
	if (encodeURIComponent(client_redirect_uri).indexOf(encodeURIComponent(reg_redirect_uri)) != 0){
		throw 'Invalid Request: Invalid Redirect URI.';
	}else{
	 	redirect_uri=client_redirect_uri;
	}
}else{
	//if redirect_uri is not provided, default to the registered uri since it's optional for the request
	redirect_uri=reg_redirect_uri;
}

try {
	
	if (response_type != "code"){
		throw 'Invalid Request: Response type must be equal to code.';
	}
	
	//start querystring
	login_url += '?';
	
	
	if (client_id != null){
	 login_url = login_url + 'apikey=' + client_id;
	 }
	if (redirect_uri != null){
	 login_url = login_url + '&redirect_uri=' + encodeURIComponent(redirect_uri);
	 }
	if (scope != null){
	 login_url = login_url + '&scope=' + scope;
	 }
	if (app != null){
	 login_url = login_url + '&app=' + app;
	 }
	if (state != null){
	 login_url = login_url + '&state=' + state; 
	 }
	 
	context.setVariable("login_url", login_url);
	
	
} catch (e) {
   
 	throw e;
 	
}





	


