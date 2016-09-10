Execution Steps
---------------
1) Clone repos under a folder which could be exported to variable 'WORKSPACE'
NOTE: You can do 'export WORKSPACE=<your local working directory>' to set WORKSPACE directory in your environment

Project: api-platform-samples 
Repo URL: git@github.com:apigee/api-platform-samples.git
Branch: docs-functest-demo
Check out to a sub-directory: api-platform-samples

Project: apitestframework 
Repo URL: git@revision.aeip.apigee.net:utils/apitestframework.git 
Branch: hdas_TESTTOOLS-1417
Check out to a sub-directory: apitestframework

2) To add tests.json in api-platform-samples please follow the below instructions - 
	- Add "tests.json" at every individual proxy folder level. As there are several other .json files the test framework will look for tests with the pattern "tests.json" Eg: helloworld_tests.json 
	- Retain the same json structure as in one of the samples - helloworld_tests.json for all the tests
	- Give a unique TestID in tests.json. TestID can be of the form TC-<proxy>-<function> Eg: TC-helloworld-getIP

3) Install pre-requisites ( nodejs)
curl --silent --location https://rpm.nodesource.com/setup | sudo su -
sudo yum install -y nodejs
sudo npm -g install npm@latest
sudo npm install -g n
sudo n stable

3) Cleanup output folder and other old data
sudo rm -rvf ${WORKSPACE}/apitestframework/APITestFramework/test-output/
#delete previous tests.xlsx & .json
sudo rm -vf ${WORKSPACE}/apitestframework/APITestFramework/src/resources/customers/apigee-docs/modules/proxysamples/data/docsTests.xlsx
sudo rm -vf ${WORKSPACE}/apitestframework/APITestFramework/src/resources/customers/apigee-docs/modules/proxysamples/data/docsTests.json

4) Change parameters under api-platform-samples/setup/setenv.sh to deploy all sample proxies
cd ${WORKSPACE}/api-platform-samples/setup
sudo sed -i.bu "s/org=.*$/org=${Organization}/g" setenv.sh
sudo sed -i.bu "s/username=.*$/username=${OrgAdminUsername}/g" setenv.sh
sudo sed -i.bu "s/password=.*$/password=${OrgAdminPassword}/g" setenv.sh
sudo sed -i.bu "s/url=.*$/url=${ManagementHost}/g" setenv.sh
sudo sed -i.bu "s/env=.*$/env=${proxyEnv}/g" setenv.sh
sudo sed -i.bu "s/api_domain=.*$/api_domain=${apiDomain}/g" setenv.sh
sudo sed -i.bu "s/provision=.*$/provision=${provisionApiProducts}/g" setenv.sh

5) Deploy all the proxies to the Organization mentioned in setenv.sh
cd ${WORKSPACE}/api-platform-samples/setup
sh deploy_all.sh

6) To parse api-platform-samples folder for all *tests.json and create a master.json, run the below script
cd ${WORKSPACE}

echo "
#!/bin/bash
rm master.json
echo '[' > master.json
find api-platform-samples -name '*tests.json' -print0 | while IFS= read -r -d '' file; do
    sudo sed '1d; \$d' \"\$file\" >>  master.json
    echo \$file
    echo \",\" >> master.json
done
sudo sed -i.bu '\$d' master.json
echo ']' >> master.json
#find proxy zip files (pattern *.zip)
find api-platform-samples -name '*.zip' -print0 | while IFS= read -r -d '' file; do
    cp $file apitestframework/APITestFramework/src/resources/customers/apigee-docs/resources/bundles
    echo $file
done
#find POST body files (pattern *_body.* Eg: developer_body.json; healthchk-apiproduct_body.xml)
find api-platform-samples -name '*_body.*' -print0 | while IFS= read -r -d '' file; do
    cp $file apitestframework/APITestFramework/src/resources/customers/apigee-docs/resources
    echo $file
done
" > generateJson.sh

rm -f master.json.bu
cat generateJson.sh
sh generateJson.sh

7) master.json generated in the previous step has the aggregated tests

8) Copy this master.json to apitestframework at the below mentioned location
yes | cp -rvf master.json ${WORKSPACE}/apitestframework/APITestFramework/src/resources/customers/apigee-docs/modules/proxysamples/data/docsTests.json

9) Execute json2xls from apitestframework to generate *tests.xlsx
cd ${WORKSPACE}/apitestframework/APITestFramework/utils/json2xls
npm install
node index.js

10) Clean build APITestFramework to execute tests from the above generated .xlsx
cd ${WORKSPACE}/apitestframework/APITestFramework
mvn clean compile assembly:single
java -cp .:target/APITestFramework-4.2.5-jar-with-dependencies.jar:src/resources com.apigee.eng.api.test.Driver -config resources/customers/apigee-docs/properties/config.properties -env apigee-docs -module PROXYSAMPLES

11) To UnDeploy all the proxies from the Org & Cleanup keys provisioned for Oauth
cd ${WORKSPACE}/api-platform-samples/setup/provisioning
sh cleanup.sh
