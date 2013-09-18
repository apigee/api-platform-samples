var orig = JSON.parse(response.content);
var channel = orig.rss.channel;
var nr = { city: channel.yweather_location.a.city,
           state: channel.yweather_location.a.region,
           country: channel.yweather_location.a.country,
           temperature: channel.item.yweather_condition.a.temp,
           conditions: channel.item.yweather_condition.a.text,
           windSpeed: channel.yweather_wind.a.speed };
response.content = JSON.stringify(nr);