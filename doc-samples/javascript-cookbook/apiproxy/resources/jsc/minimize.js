//Parse the original response into a JSON object
var res = JSON.parse(context.proxyResponse.content);

//Pull out only the information we want to see in the response.
var minimizedResponse = { city: res.root.city,
                          state: res.root.state };
          
//Set the response variable. 
context.proxyResponse.content = JSON.stringify(minimizedResponse);
