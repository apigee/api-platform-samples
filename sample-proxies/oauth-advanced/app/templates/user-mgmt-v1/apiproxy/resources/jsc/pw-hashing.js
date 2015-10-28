
var kvm_data = context.getVariable("kvm_data");
var request_pw = context.getVariable("request_pw");
var request_pw_new = context.getVariable("request_pw_new");
var flow = context.getVariable("current.flow.name");

var SALT_LENGTH = 25;
var SALT_ALPHA_NUMERIC_CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var KEY = "apigee123";

// allow the same policy to be used in multiple flows by dynamically executing logic based on the flow name
if (flow.search("authenticate") != -1){

	context.setVariable("auth_result", validate(request_pw, kvm_data));
}

if (flow.search("create") != -1){
	
	var salt = generateRandomSalt(SALT_LENGTH, SALT_ALPHA_NUMERIC_CHARS);
	request_pw += ":" + salt;
 	context.setVariable("kvm_data", create(request_pw) + ":" + salt);
 	
}

if (flow.search("changepw") != -1){
    
    // validate the current password before allowing a change
    var result = validate(request_pw, kvm_data);
    
    if(result){
      var salt = generateRandomSalt(SALT_LENGTH, SALT_ALPHA_NUMERIC_CHARS);
      request_pw += ":" + salt;
      context.setVariable("kvm_data", create(request_pw) + ":" + salt);
    }
    
    context.setVariable("auth_result", result);
}


function create(request_pw){
  
  var hash = CryptoJS.HmacSHA1(request_pw, KEY);
  return hash.toString(CryptoJS.enc.Hex);
  	
}
    
function validate(request_pw, kvm_data){

  var kvm_array = kvm_data.split(":");
  kvm_pw = kvm_array[0];
  kvm_salt = kvm_array[1];
  request_pw += ":" + kvm_salt;
  var hash = CryptoJS.HmacSHA1(request_pw, KEY);
  hash = hash.toString(CryptoJS.enc.Hex);
  context.setVariable("request_hash", hash);

  if (hash === kvm_pw){
    return true;
  }
  else{
   	return false; 
  }
  	
}


function generateRandomSalt(length, chars) {

  // result that will be appended to until length is reached
  var result = "";
  
  // randomly chose character from character domain
  for (var i = length; i > 0; --i)
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  
  // return result
  return result;
}
