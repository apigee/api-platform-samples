# Save part of the request URL in a flow variable

#### Date 
12/2/15

#### Proxy name:
extract-variables

#### Goal 

* Use the Extract Variables policy to parse the incoming request URL and save part of the URL in a flow variable. 
* Return the extracted value in the response

#### Policies used

* Extract Variables -- Parses the request URL, extracts a value from the URL, and stores it in a variable. Attached to the ProxyEndpoint PreFlow.
* JavaScript -- Reads the extracted value from the flow variable and returns it in the response. Attached to the ProxyEndpoint PreFlow.

##### Story

Let's say the request URL looks like this:

`http://myorg-test.apigee.net/samplet-extract-variables/resource1/123456`

We want to extract the value `123456` into a flow variable called `urirequest.id`. This is a common use case, where the extracted value can be used in another policy elsewhere in the proxy flow.

We use the Extract Variables policy shown below. The policy says: If the incoming request URI path (technically, the `proxy.pathsuffix`) matches the specified pattern, parse out the value of the {id} part of the path, and store that value in a variable called `urirequest.id`. 

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

In our samplet, the value of {id} is `123456`, and that's what gets saved. You can call the API and replace `123456` with any value you wish, and it will save that value. 


#### Sample input:

`http://myorg-test.apigee.net/parse-request-url/samplet-extract-variables/resource1/123456`

#### Sample output:

```json
    {
        "Feature demonstrated": "Extract value of {id} parsed from the proxypath.suffix: /extract-variables/resource1/{id}.",
        "Data extracted": "helloworld",
        "Policy demonstrated": "Extract Variables"
    }
```
