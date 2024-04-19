## USAGE

**create flow callout policy in your proxy**

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<FlowCallout async="false" continueOnError="false" enabled="true" name="FC-PayloadToQueryString">
    <DisplayName>FC-PayloadToQueryString</DisplayName>
    <FaultRules/>
    <Properties/>
    <Parameters>
        <Parameter name="SF-PayloadToQueryStrin.fields">["name"]</Parameter>
    </Parameters>
    <SharedFlowBundle>SF-PayloadToQueryString</SharedFlowBundle>
</FlowCallout>
```

---

## Call the proxy

```sh
curl --location --request POST {{proxyURL}} \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "lama",
    "gender": "female",
    "age": 26
}'
```


