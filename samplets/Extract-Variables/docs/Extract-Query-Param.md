# Save part of a query parameter to a flow variable

#### Date 
12/2/15

#### Proxy name:

Extract Variables

##### Goal 

* Parse in incoming request URL and save part of a query parameter in a flow variable.  

##### Sample input:

`http://myorg-test.apigee.net/parse-request-url/samplet-extract-variables?DNCabc123`

##### Sample result:

The value `abc123` is extracted and stored in a flow variable. 

##### Story

A client calls an Edge proxy with this URL:

`http://myorg-test.apigee.net/extract-variables?code=DBNabc123`

You want to extract the variable value `abc123` into a flow variable called `queryinfo.dbncode`. 

This is a common use case, where the extracted value can be used in another policy elsewhere in the proxy flow.

##### Policy XML

Here is the XML for the Extract Variables policy: 

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

#### Sample output:

The samplet returns this output to the client:

```json
    {
      "Feature demonstrated": "Extract value of {dbncode} parsed from the code query parameter: ?code=DBN{dbncode}",
      "Data extracted": "abc123",
      "Policy demonstrated": "Extract Variables"
    }
```



