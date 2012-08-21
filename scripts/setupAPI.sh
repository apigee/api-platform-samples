
echo Deleting any /responses directory
rm -r ./responses

echo Creating a Fresh Responses Directory--all responses will be written to ./responses

mkdir ./responses

echo Welcome to the Apigee API

echo This script will run you through complete set up of an API facade using the Apigee API

echo If anything goes wrong, simply run resetOrg.bash in this directory and begin again.

echo "Enter the name of your Apigee organization, followed by [ENTER]:"

read org

echo "Enter your username for the Apigee organization, followed by [ENTER]:"

read username

echo "Enter your password for the Apigee organization, followed by [ENTER]:"

read -s password

echo using $username and $org

echo Get Organization

curl -u $username:$password https://api.enterprise.apigee.com/v1/o/$org | python -mjson.tool > ./responses/GetOrg.json

echo Create an API

curl -u $username:$password -H "Content-Type: application/json" https://api.enterprise.apigee.com/v1/o/$org/apis -X POST -d'{"name" : "weatherAPI",   "policies" : [ ],   "proxyEndpoints" : [ "proxy" ],   "resources" : [ ],   "targetEndpoints" : [ "static" ],   "targetServers" : [ ],   "type" : "Application"}' | python -mjson.tool > ./responses/CreateAPI.json

echo List APIs

curl -u $username:$password https://api.enterprise.apigee.com/v1/o/$org/apis | python -mjson.tool > ./responses/ListAPIs.json

echo Get an API

curl -u $username:$password https://api.enterprise.apigee.com/v1/o/$org/apis/weatherAPI | python -mjson.tool > ./responses/GetAPI.json

echo List API Proxy Revisions

curl -u $username:$password https://api.enterprise.apigee.com/v1/o/$org/apis/weatherAPI | python -mjson.tool > ./responses/ListProxyRevisions.json

echo Get API  Revision

curl -u $username:$password https://api.enterprise.apigee.com/v1/o/$org/apis/weatherAPI/revisions/1 | python -mjson.tool > ./responses/ListRevisions.json

echo List Environments

curl -u $username:$password https://api.enterprise.apigee.com/v1/o/$org/environments | python -mjson.tool > ./responses/ListEnv.json

echo List Deployments

curl -u $username:$password https://api.enterprise.apigee.com/v1/o/$org/apis/weatherAPI/revisions/1/deployments | python -mjson.tool > ./responses/ListDeployments.json

echo Get Environment Deployments

curl -u $username:$password https://api.enterprise.apigee.com/v1/o/$org/environments/test/deployments | python -mjson.tool > ./responses/ListEnvDeployments.json

echo Find Named Virtualhost

curl -u $username:$password https://api.enterprise.apigee.com/v1/o/$org/environments/test/virtualhosts | python -mjson.tool > ./responses/ListVirtualHosts.json

echo "Get Setting for Named Virtual Host" 

curl -u $username:$password https://api.enterprise.apigee.com/v1/o/$org/environments/test/virtualhosts/default | python -mjson.tool > ./responses/GetVirtualHost.json

echo Add Target Endpoint

curl -u $username:$password -H "Content-Type: application/json" -X POST -d'{ "connection" : { "uRL" : "http://weather.yahooapis.com/forecastrss?w=12797282&" }, "type" : "Target", "name" : "default"}' https://api.enterprise.apigee.com/v1/o/$org/apis/weatherAPI/revisions/1/targets > ./responses/CreateTargetEndpoint.json

echo List Target Endpoints

curl -u $username:$password https://api.enterprise.apigee.com/v1/o/$org/apis/weatherAPI/revisions/1/targets > ./responses/ListTargetEndpoints.json

echo Get Target Endpoint Definition

curl -u $username:$password https://api.enterprise.apigee.com/v1/o/$org/apis/weatherAPI/revisions/1/targets/default > ./responses/GetTargetEndpoint.json

echo Create ProxyEndpoint

curl -u $username:$password -H "Content-type: application/json" -X POST -d'{"connection" : {"basePath" : "/weatherAPI","virtualHost" : [ "default" ]}, "name" : "default", "routeRule" : [ {"name" : "default","targetEndpoint" : "default"} ]}' https://api.enterprise.apigee.com/v1/o/$org/apis/weatherAPI/revisions/1/proxies > ./responses/CreateProxyEndpoint.json


echo List Proxy Endpoints

curl -u $username:$password https://api.enterprise.apigee.com/v1/o/$org/apis/weatherAPI/revisions/1/proxies > ./responses/ListProxyEndpoints.json

echo Get Proxy Endpoint

curl -u $username:$password https://api.enterprise.apigee.com/v1/o/$org/apis/weatherAPI/revisions/1/proxies/default | python -mjson.tool  > ./responses/GetProxyEndpoint.json

echo List API Proxy Revisions 2

curl -u $username:$password https://api.enterprise.apigee.com/v1/o/$org/apis/weatherAPI | python -mjson.tool > ./responses/ListProxyRevisions2.json

echo Deploy Revision 1 to Test Environment

curl -u $username:$password -H "Content-type:application/octet-stream" -X POST https://api.enterprise.apigee.com/v1/o/$org/apis/weatherAPI/revisions/1/deployments?'action=deploy&env=test&basepath=/' > ./responses/DeployRevision.json

echo Get Test Deployments

curl -u $username:$password https://api.enterprise.apigee.com/v1/o/$org/environments/test/deployments > ./responses/ListTestDeployments.json

echo List Flows JSON

curl -u $username:$password https://api.enterprise.apigee.com/v1/organizations/$org/apis/weatherAPI/revisions/1/proxies/default/flows | python -mjson.tool > ./responses/ListFlows.json

echo Get PreFlow JSON 
curl -u $username:$password https://api.enterprise.apigee.com/v1/organizations/$org/apis/weatherAPI/revisions/1/proxies/default/flows/PreFlow | python -mjson.tool > ./responses/GetPreflow.json

echo Get PostFlow JSON 

curl -u $username:$password https://api.enterprise.apigee.com/v1/organizations/$org/apis/weatherAPI/revisions/1/proxies/default/flows/PostFlow | python -mjson.tool > ./responses/GetPostflow.json

echo Create a Conditional Flow Json

curl -u $username:$password -H "Content-Type: application/json" -X POST -d'{"flow":{"-name":"WeatherFlow","description":{},"condition":"request.uri = \"/weather\""}}' https://api.enterprise.apigee.com/v1/o/$org/apis/weatherAPI/revisions/1/proxies/default/flows | python -mjson.tool > ./responses/CreateFlow.json

echo Submit Request to Naked API 

curl 'http://weather.yahooapis.com/forecastrss?w=12797282&' > ./responses/YahooWeatherNaked.html

echo Submit Request to API Facade

curl http://$org-test.apigee.net/weatherAPI > ./responses/YahooWeatherFacade.html

#Create and Attach Policy
echo Create Quota Policy
curl -u $username:$password  -H "Content-Type: application/json" -X POST -d'{"policyType" : "Quota","alert" : [ ],"allow" : {"count" : 1},"async" : false,"continueOnError" : false,"distributed" : false,"enabled" : true,"faultRules" : [ ],"interval" : {"ref" : "request.header.quota_count","value" : "1"},"name" : "WeatherQuota","synchronous" : false,"timeUnit" : {"ref" : "request.header.quota_timeout","value" : "minute"}}' https://api.enterprise.apigee.com/v1/o/$org/apis/weatherAPI/revisions/1/policies | python -mjson.tool > ./responses/CreateQuotaPolicy.json

echo Attach Quota Policy

curl -u $username:$password -H "Content-type: application/octet-stream" -X POST https://api.enterprise.apigee.com/v1/o/$org/apis/weatherAPI/revisions/1/proxies/default/flows/PreFlow/steps?'name=WeatherQuota&enforcement=request' | python -mjson.tool > ./responses/AttachQuotaPolicy.json

echo Submit 3 Requests to violate the Quota Policy

for ((n=0;n<3;n++))
do
curl http://$org-test.apigee.net/weatherAPI > ./responses/YahooWeather-QuotaViolation.html
done

echo List Policies on the API

curl -u $username:$password https://api.enterprise.apigee.com/v1/o/$org/apis/weatherAPI/revisions/1/policies > ./responses/ListPolicies.json



#Debug session

echo Create Debug Session

curl -u $username:$password -H "Content-Type: application/octet-stream" -X POST https://api.enterprise.apigee.com/v1/runtime/o/$org/environments/test/apis/weatherAPI/revisions/1/debugsessions/?'session=WeatherSession'

curl -u $username:$password -H "Content-Type: application/json" -X POST https://api.enterprise.apigee.com/v1/organizations/$org/environments/test/apis/weatherAPI/revisions/1/debugsessions?'session=WeatherSession&header_traceme=true'

echo Submit Request to API with debug headers

curl -H "traceme:true" http://$org-test.apigee.net/weatherAPI > ./responses/YahooWeather-debug.html

echo Get Debug Session ID

curl -u $username:$password https://api.enterprise.apigee.com/v1/organizations/$org/environments/test/apis/weatherAPI/revisions/1/debugsessions/WeatherSession/data > ./responses/GetDebugSessionID.json

#start provisioning apps

echo Create an Auto API Product

curl -u $username:$password -H "Content-Type:application/json" https://api.enterprise.apigee.com/v1/o/$org/apiproducts -X POST -d'{"apiResources" : [ "/weather" ],"approvalType" : "auto","attributes" : [ {"name" : "description","value" : "Introductory Weather API Product"}, {"name" : "developer.quota.interval","value" : "1"}, {"name" : "developer.quota.limit","value" : "1"}, {"name" : "developer.quota.timeunit","value" : "minute"}, {"name" : "access","value" : "external"}, {"name" : "apisDeployedIn","value" : "test"}, {"name" : "servicePlan","value" : "Introductory"} ],"description" : "Free API Product","displayName" : "Free API Product","name" : "weather_free","scopes" : [ ]}' https://api.enterprise.apigee.com/v1/o/$org/apiproducts > ./responses/CreateAutoAPIProduct.json

echo Create a Manual API Product

curl -u $username:$password -H "Content-Type:application/json" https://api.enterprise.apigee.com/v1/o/$org/apiproducts -X POST -d'{"apiResources" : [ "/weather" ],"approvalType" : "manual","attributes" : [ {"name" : "description","value" : "Premium Weather API Product"}, {"name" : "developer.quota.interval","value" : "1"}, {"name" : "developer.quota.limit","value" : "1"}, {"name" : "developer.quota.timeunit","value" : "second"}, {"name" : "access","value" : "external"}, {"name" : "apisDeployedIn","value" : "test"}, {"name" : "servicePlan","value" : "Premium"}],"description" : "Premium API Product","displayName" : "Premium API Product","name" : "weather_premium","scopes" : [ ]}' https://api.enterprise.apigee.com/v1/o/$org/apiproducts > ./responses/CreateManualAPIProduct.json

echo List API Products

curl -u $username:$password https://api.enterprise.apigee.com/v1/o/$org/apiproducts | python -mjson.tool > ./responses/ListAPIProducts.json

echo Get  API Product

curl -u $username:$password https://api.enterprise.apigee.com/v1/o/$org/apiproducts/weather_premium | python -mjson.tool > ./responses/GetAPIProduct.json
  
echo Create a Developer

curl -u $username:$password -H "Content-type:application/json" -X POST -d'{ "email" : "ntesla@theramin.com", "firstName" : "Nikola", "lastName" : "Tesla", "userName" : "theramin", "attributes" : [ { "name" : "region", "value" : "north"} ]}' https://api.enterprise.apigee.com/v1/o/$org/developers > ./responses/CreateDeveloper.json

echo List Developers

curl -u $username:$password https://api.enterprise.apigee.com/v1/o/$org/developers | python -mjson.tool > ./responses/ListDevelopers.json

echo Get a Developer

curl -u $username:$password https://api.enterprise.apigee.com/v1/o/$org/developers/"ntesla@theramin.com"  | python -mjson.tool > ./responses/GetDeveloper.json

curl -u $username:$password 'https://api.enterprise.apigee.com/v1/o/$org/developers/"ntesla@theramin.com"/appfamilies?expand=true' > ./responses/ListAppFamiliesEx.json

echo Create an App that uses Free API Product

curl -u $username:$password -H "Content-type:application/json" -X POST -d'{"accessType" : "read","attributes" : [ {"name" : "Platform","value" : "iOS"} ],"apiProducts": [ "weather_free"],"callbackUrl" : "www.apigee.com","name" : "weatherapp"}' https://api.enterprise.apigee.com/v1/o/$org/developers/ntesla%40theramin%2Ecom/apps > ./responses/CreateAppManual.json

echo List Developer Apps

curl -u $username:$password https://api.enterprise.apigee.com/v1/o/$org/developers/ntesla%40theramin%2Ecom/apps  | python -mjson.tool > ./responses/ListApps.json

echo Get a Developer App

curl -u $username:$password https://api.enterprise.apigee.com/v1/o/$org/developers/ntesla%40theramin%2Ecom/apps/weatherapp  | python -mjson.tool > ./responses/ListApps.json

echo Create an App that uses Premium API Product 

curl -u $username:$password -H "Content-type:application/json" -X POST -d'{"accessType" : "read","attributes" : [ {"name" : "Platform","value" : "iOS"} ],"apiProducts": [ "weather_premium"],"callbackUrl" : "www.apigee.com","name" : "weatherapp_prod"}' https://api.enterprise.apigee.com/v1/o/$org/developers/ntesla%40theramin%2Ecom/apps  > ./responses/CreateAppManual.json

echo Get the Consumer Key of the New App

curl -u $username:$password https://api.enterprise.apigee.com/v1/o/$org/developers/ntesla%40theramin%2Ecom/apps/weatherapp_prod/keys > ./responses/GetAppKey.json


# Create Company, App Family
echo  Create Company

curl -u $username:$password https://api.enterprise.apigee.com/v1/o/$org/companies -H "Content-type:application/json" -X POST -d' {"name" : "theramin","displayName" : "Theramin Corporation" ,"status" : "active","attributes" : [ {"name" : "billing_code","value" : "13648765"} ]}' | python -mjson.tool > ./responses/CreateCompany.json

echo List Companies Expanded

curl -u $username:$password https://api.enterprise.apigee.com/v1/o/$org/companies?'expand=true' > ./responses/ListCompaniesExpanded.json

echo Add Company Developer

curl -u $username:$password https://api.enterprise.apigee.com/v1/o/$org/companies/theramin/developers -H "Content-type:application/json" -X POST -d'  {"developer" : [ {"email" : "ntesla@theramin.com","role" : "developer"} ]}' > ./responses/AddCompanyDeveloper.json

echo Create an App Family

curl -u $username:$password -H "Content-type:application/json" https://api.enterprise.apigee.com/v1/o/$org/developers/"ntesla@theramin.com"/appfamilies -X POST -d '{"name" : "WeatherApps","apps": ["weatherapp", "weatherapp_prod"]}' > ./responses/AddAppFamily.json

echo Remove App from Family

curl -u $username:$password https://api.enterprise.apigee.com/v1/o/$org/developers/"ntesla@theramin.com"/appfamilies/WeatherApps/apps/weatherapp -X DELETE > ./responses/RemoveAppFromFamily.json

# Analytics

echo API Analytics

echo Get Report on Daily by Hour Traffic Test Environment
curl -u $username:$password https://api.enterprise.apigee.com/v1/o/$org/environments/test/stats/?'select=message_count&timeRange=7/30/2012%2000:00~7/31/2012%2000:00&timeUnit=hour' > ./responses/StatsTestEnv.json

echo Get Report on Daily Traffic by Hour Prod Environment
curl -u $username:$password https://api.enterprise.apigee.com/v1/o/$org/environments/prod/stats/?'select=message_count&timeRange=7/30/2012%2000:00~7/31/2012%2000:00&timeUnit=hour' > ./responses/StatsProdEnv.json

echo Get Report on All APIs

curl -u $username:$password https://api.enterprise.apigee.com/v1/o/$org/environments/test/stats/apis?'select=message_count&timeRange=7/30/2012%2000:00~7/31/2012%2000:00&timeUnit=day&sortby=message_count&sort=DESC' > ./responses/StatsAllAPIs.json


echo All responses have been saved in ./responses
echo To clean up run ./resetOrg.bash


