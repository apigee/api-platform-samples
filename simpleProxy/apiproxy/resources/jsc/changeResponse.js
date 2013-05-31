context.proxyResponse.status ="200";
context.proxyResponse.headers['X-Apigee-Test-Header-1'][0]='target.name';
context.proxyResponse.headers['X-Apigee-Test-Header-2'][0]='Test-Header 2 Value 0';
context.proxyResponse.headers['X-Apigee-Test-Header-2'][1]='Test-Header 2 Value 1';
context.proxyResponse.content='This is your code on Apigee!';