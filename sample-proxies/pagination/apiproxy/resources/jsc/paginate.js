var contentListingsJSON = JSON.parse(context.proxyResponse.content);
var listingsLength = contentListingsJSON.book.length;
var offset = +context.getVariable("offset");
var limit = +context.getVariable("limit");
var temp = offset;
var offset_plus_limit = offset+limit;
context.setVariable("offset_plus_limit", offset_plus_limit);
var contentBriefPage = new Array();
while(temp < listingsLength) {
  if(temp >= offset && temp < offset_plus_limit) {
    contentBriefPage.push(contentListingsJSON.book[temp]);
  } else if(temp >= offset+limit){
    break;
  }
  temp++;
}
if(temp < offset_plus_limit || temp == listingsLength) {
  context.setVariable("offset", 0);
} else {
  context.setVariable("offset", temp);
}
contentListingsJSON.book = contentBriefPage;
context.proxyResponse.content = JSON.stringify(contentListingsJSON);
context.proxyResponse.headers["Content-Type"] = "application/json";