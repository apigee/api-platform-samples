var randomnumber = Math.floor(Math.random()*10000000)
//var randomnumber = context.getVariable("request.queryparam.provider")
context.setVariable("urlencoding.requesturl.hashed",randomnumber)
context.setVariable("urlencoding.longurl.encoded", "http://tiny.url." + randomnumber)