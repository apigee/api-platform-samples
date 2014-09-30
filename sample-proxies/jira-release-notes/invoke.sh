#!/bin/bash

echo "Using org and environment configured in /setup/setenv.sh"

source ../../setup/setenv.sh

echo
echo
echo "This call needs the following already set up in Jira:"
echo "* Jira issues tagged with a release_notes label"
echo "* Content in the Release Notes Summary field."
echo
echo "Enter your JIRA username, then [ENTER]:"
read jirausername
echo
echo "Now enter your JIRA password"

curl -u $jirausername "https://$org-$env.$api_domain/releasenotes/search?jql=labels%3Drelease_notes"

