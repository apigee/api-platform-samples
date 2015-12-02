# Extract value from a request URL

#### Date: 
12/2/15

#### Name: 
Extract a value from the incoming request URL

#### Proxy name:
parse-request-url

#### Policies used

* Extract Variables -- Parses the request URL, extracts a value from the URL, and stores it in a variable. 
* JavaScript -- Reads the extracted value from the variable and returns it in the response. 

#### Notes

We use the <URIPath> element in Extract Variables to specify the pattern to match in the request URL. The policy looks at the `proxy.pathsuffix` part of the URL when it performs the pattern match. 

#### Goal:
1. Parse the incoming request URL
2. Extract a specific value from the URL
3. Store the value in a flow variable
4. Read the value from the variable
5. Return the value in the response

#### Sample input:

`http://myorg-test.apigee.net/parse-request-url/extract-variables/resource1/123456`

#### Sample output:

```json
    {
        "Feature demonstrated": "Extract value of {id} parsed from the proxypath.suffix: /extract-variables/resource1/{id}.",
        "Data extracted": "helloworld",
        "Policy demonstrated": "Extract Variables"
    }
```

#### Extract Variables Policy XML

Attached to: ProxyEndpoint PreFlow

```xml
        <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <ExtractVariables name="Extract-Path-Component">
            <DisplayName>Extract Path Component</DisplayName>
            <Source>request</Source>
            <URIPath>
                <Pattern ignoreCase="true">/extract-variables/resource1/{id}</Pattern>
            </URIPath>
            <VariablePrefix>urirequest</VariablePrefix>
            <IgnoreUnresolvedVariables>true</IgnoreUnresolvedVariables>
        </ExtractVariables>
```


#### Extract Variables Policy XML

Attached to: ProxyEndpoint PostFlow

```xml
        <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <ExtractVariables name="Extract-Path-Component">
            <DisplayName>Extract Path Component</DisplayName>
            <Source>request</Source>
            <URIPath>
                <Pattern ignoreCase="true">/extract-variables/resource1/{id}</Pattern>
            </URIPath>
            <VariablePrefix>urirequest</VariablePrefix>
            <IgnoreUnresolvedVariables>true</IgnoreUnresolvedVariables>
        </ExtractVariables>
```