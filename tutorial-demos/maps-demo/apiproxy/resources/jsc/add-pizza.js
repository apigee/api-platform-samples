 var topLocations = ["Falkenberg, Sweden", "Rhode Island, USA", "Copenhagen, Denmark", 
 "Motorino, Hong Kong", "Glasgow, Scotland", "Cape Town, South Africa", "Kuala Lumpar, Malaysia",
 "Milan, Italy", "Frankfurt, Germany", "Louisiana, USA", "Berlin, Germany", "Bratislava, Slovakia",
 "Rome, Italy", "Indianapolis, IN, USA", "Tokyo, Japan", "Amsterdam, Netherlands",
 "Buenos Aires, Argentina", "London, England", "Helsinki, Finland", "Caiazzo, Italy", "Moscow, Russia",
 "Toronto, Canada", "Dubai, UAE", "Florence, Italy", "Prague, Czech Republic", "London, England",
 "Adelaide, Australia", "Dublin, Ireland", "New York, NY, USA", "Naples, Italy", "Jersey City, NJ, USA",
 "Paris, France", "Bucharest, Romania", "Sydney, Australia", "São Paulo, Brazil", "Auckland, New Zealand",
 "Singapore", "Toronto, Canada", "New York, NY, USA", "Naples, Italy", "Manchester, UK", "Melbourne, Australia",
 "San Francisco, USA", "Essendon, Australia", "København, Denmark", "Los Angeles, USA", "Naples, Italy", "New York, NY, USA",
 "Naples, Italy", "Chicago, IL, USA"];

var res = JSON.parse(context.proxyResponse.content);

if (res.candidates.length > 0) {
    print("candiates has content " + res.candidates[0].formatted_address);
    if (topLocations.indexOf(res.candidates[0].formatted_address) > -1) {
        res.candidates[0].top_pizza_location = "true";
    }
    else {
        res.candidates[0].top_pizza_location = "false";
    }
}
else
    print("candidates is empty!");

context.proxyResponse.content = JSON.stringify(res);