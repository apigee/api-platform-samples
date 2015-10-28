var user = context.getVariable("username");

if (user){
	context.setVariable("username", user.toLowerCase());
}