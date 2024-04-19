# Save part of the request URL in a flow variable

## Goal

Parse in incoming request URL and save part of the URL path into a flow variable.

For example,
given input like: `/resource1/420DDB2C` ,  
the desired result is that the value `420DDB2C` is extracted and stored in a flow variable.

## Story

A client calls an Apigee proxy with this URL:

`https://my-apigee-host.net/samplet-extract-variables/resource1/420DDB2C`

You want to extract the variable value `420DDB2C` into a flow variable called
`urirequest.id`.

This is a common use case, where the extracted value can be used in a subsequent
step elsewhere in the proxy flow.

## Policy XML

Here is the XML for [the relevant Extract Variables policy](../apiproxy/policies/EV-Path-Component.xml):

```xml
<ExtractVariables name="EV-Path-Component">
  <Source>request</Source>
  <URIPath>
    <Pattern ignoreCase="true">/resource1/{id}</Pattern>
  </URIPath>
  <VariablePrefix>urirequest</VariablePrefix>
  <IgnoreUnresolvedVariables>true</IgnoreUnresolvedVariables>
</ExtractVariables>
```

Results: Sending in a request like
```
GET $apigeehost/samplet-extract-variables/resource1/420DDB2C
```

...to this samplet, the variable `urirequest.id` gets the value `420DDB2C`.

You can call the API and replace `420DDB2C` with any value you wish in the
path segment, and it will save that value.


## Sample output:

The samplet returns this output to the client:

```json
{
  "Feature demonstrated": "Extract value of {id} parsed from the proxypath.suffix: /extract-variables/resource1/{id}.",
  "Data extracted": "420DDB2C",
  "Policy demonstrated": "Extract Variables",
  "Flow variable written/read": "urirequest.id"
}
```
