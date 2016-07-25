#!/bin/bash

function deploy_proxy {
    if hash apigeetool 2>/dev/null; then
    	printf "\n\nUsing apigeetool to deploy the proxy to the $env environment in the $org org...\n\n"
        apigeetool deployproxy -o $org -e $env -n learn-edge -L $url -d . -u $username -p $password -V
        printf "\nIf 'State: deployed', then your API Proxy is ready to be invoked.\n"
        printf "\nRun 'invoke.sh'\n"
    else
        printf "\n\n****Exiting: You must install apigeetool: npm -install apigeetool -g\n\n" 
    fi
}