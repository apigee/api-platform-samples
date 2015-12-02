# Save part of a query parameter to a flow variable

#### Date 
12/2/15

#### Proxy name:
parse-request-url

#### Goal 

* Use the Extract Variables policy to parse the incoming request URL and save part of a query parameter in a flow variable. 
* Return the extracted value in the response

#### Policies used

* Extract Variables -- Parses the request URL, extracts a value from a query parameter, and stores it in a variable. Attached to the ProxyEndpoint PreFlow.
* JavaScript -- Reads the extracted value from the flow variable and returns it in the response. Attached to the ProxyEndpoint PreFlow

##### Story

Let's say the request URL looks like this, with a query param that has a fixed part `DBN` and a variable part, such as `abc123`, as follows:

`http://myorg-test.apigee.net/parse-request-url/extract-variables?code=DBNabc123`

We want to extract the variable value `abc123` into a flow variable called `queryinfo.id`. This is a common use case, where the extracted value can be used in another policy elsewhere in the proxy flow.

We use the Extract Variables policy shown below. The policy says: If the incoming request URI path (technically, the `proxy.pathsuffix`) matches the specified pattern, parse out the value of the {id} part of the path, and store that value in a variable called `queryinfo.dbncode`. 

```xml
    <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <ExtractVariables name="Extract-Query-Param">
        <DisplayName>Extract Query Param</DisplayName>
        <Source>request</Source>
        <QueryParam name="code">
            <Pattern ignoreCase="true">DBN{dbncode}</Pattern>
        </QueryParam>
        <VariablePrefix>queryinfo</VariablePrefix>
        <IgnoreUnresolvedVariables>true</IgnoreUnresolvedVariables>
    </ExtractVariables>
```

In our samplet, the value of {dbncode} is `abc123`, and that's what gets saved. You can call the API and replace `abc123` with any value you wish in the query param, and it will save that value. 

#### Sample input:

`http://myorg-test.apigee.net/parse-request-url/extract-variables?DNCabc123`

#### Sample output:

```json
    {
      "Feature demonstrated": "Extract value of {dbncode} parsed from the code query parameter: ?code=DBN{dbncode}",
      "Data extracted": "abc123",
      "Policy demonstrated": "Extract Vßariables"
    }
```



