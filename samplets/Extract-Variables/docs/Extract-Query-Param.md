# Save part of a query parameter to a flow variable

## Goal

Parse in incoming request URL and save _part of a query parameter_ into a flow
variable.

For example,
given input like: `?code=DNCabc123`,
the desired result is that the value `abc123` is extracted and stored in a flow variable.

## Story

A client calls an Apigee proxy with this URL:

`https://my-apigee-host.net/samplet-extract-variables?code=DBNabc123`

You want to extract the variable value `abc123` into a flow variable called
`queryinfo.dbncode`.

This is a common use case, where the extracted value can be used in a subsequent
step elsewhere in the proxy flow.

## Policy XML

Here is the XML for [the relevant Extract Variables policy](../apiproxy/policies/EV-Query-Param.xml):

```xml
<ExtractVariables name="EV-Query-Param">
  <Source>request</Source>
  <QueryParam name="code">
    <Pattern ignoreCase="true">DBN{dbncode}</Pattern>
  </QueryParam>
  <VariablePrefix>queryinfo</VariablePrefix>
  <IgnoreUnresolvedVariables>true</IgnoreUnresolvedVariables>
</ExtractVariables>
```

Results: Sending in a request like
```
GET $apigeehost/samplet-extract-variables?code=DBNabc123
```

..to our samplet, the variable `queryinfo.dbncode` gets the value `abc123`.

You can call the API and replace `abc123` with any value you wish in the
query param, and it will save that value.

| provided query parameter input | value stored into `queryinfo.dbncode` |
| ------------------------------ | ------------------------------------- |
| `code=DBNA1`                   | `A1`                                  |
| `code=DBNabc123`               | `abc123`                              |
| `code=a123`                    | -none-                                |
| `code=DBN`                     | -empty-                               |


## Sample output:

The samplet returns this output to the client:

```json
{
  "Feature demonstrated": "Extracted value of {dbncode} parsed from query param: /extract-variables?code=DBN{dbncode}.",
  "Data extracted": null,
  "Policy demonstrated": "Extract Variables",
  "Flow variable written/read": "queryinfo.dbncode"
}
```

