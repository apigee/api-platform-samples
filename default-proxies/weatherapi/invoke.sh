#!/bin/bash
source ../../setup/setenv.sh

echo -e "\nCalling the weather API for Palo Alto, CA"
echo -e "\nCalling: curl http://$org-$env.$api_domain/v0/weather/forecastrss?w=12797282\n"

curl http://$org-$env.$api_domain/v0/weather/forecastrss?w=12797282

echo -e "\n\nTo pretty format the JSON response, try adding '| python -m json.tool' to the end of the API URL."
echo -e "\nLike this: curl http://$org-$env.$api_domain/v0/weather/forecastrss?w=12797282 | python -m json.tool\n"

