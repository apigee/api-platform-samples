//Parse the original response from Yahoo weather
var originalResponse = JSON.parse(context.proxyResponse.content);
// Populate a variable with the orignal response object
var channel = originalResponse.rss.channel;
// Populate a variable with the minimized response object, extracting on the properties that we want to include in theh final response to the requesting app.
var minimizedResponse = { city: channel.location.city,
           country: channel.location.country,
           temperature: channel.item.condition.temp,
           conditions: channel.item.text,
           windSpeed: channel.wind.speed };
context.proxyResponse.content = JSON.stringify(minimizedResponse);

//Be sure to run 'deploy.sh' for changes to take effect.