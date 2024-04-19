# Apigee Edge API Proxy Samplets

## What are samplets?

* Samplets are API proxies that you can run on Apigee Edge that demonstrate one
  or two targeted features of a policy.

* Samplets try to answer the question: how the does this policy *really* work?

* Samplets are easy to modify and redeploy -- quickly see the effects when you
  change a policy's configuration.

* Samplets are intentionally simplistc, and are intended to demonstrate one or
  two features of a single policy.

* Some samplets demonstrate how multiple policies work together for very targeted use cases. 

* Samplets supplement policy documentation and are usually tied to examples in the documentation. 


## How to use samplets

Apigee proxy samplets are easy to deploy and run:

1. Clone the `api-proxy-samples` Git repo to your local system. This repo includes a `samplets` folder. 
2. cd to the `samplets folder`.
3. cd to the folder containing the samplet you wish to deploy. For example:

    `cd Extract-Variables`

4. In an editor, open `../../setup/setenv.sh` and enter the information for your
   Apigee organization and environment. This config file is used by the deploy script to
   deploy the samplet to your org.

5. Execute the `deploy.sh` script. You may have to change the file permission to
   allow you to execute it the first time. For example:

    ```
    chmod 755 deploy.sh
    ./deploy.sh
    ```

6. Run the samplet with the `invoke.sh` script. For example:

    ```
    chmod 755 invoke.sh
    ./invoke.sh
    ```

> **Tip:** You can also use an API tool like Postman to execute the APIs. 

## Sample output

The invoke script calls the samplet proxies one by one, and returns a response
that includes information about what the samplet accomplished. For example:

```


API 1 of 2: https://apigee1.cymbalgroup.com/samplet-extract-variables?code=DBNabc123
Press Return to call this API...
{
  "Feature demonstrated": "Extracted value of {dbncode} parsed from query param: /extract-variables?code=DBN{dbncode}.",
  "Data extracted": "abc123",
  "Policy demonstrated": "Extract Variables",
  "Flow variable written/read": "queryinfo.dbncode"
}


API 2 of 2: https://apigee1.cymbalgroup.com/samplet-extract-variables/resource1/DBNabc123
Press Return to call this API...
{
  "Feature demonstrated": "Extract value of {id} parsed from the proxypath.suffix: /extract-variables/resource1/{id}.",
  "Data extracted": "DBNabc123",
  "Policy demonstrated": "Extract Variables",
  "Flow variable written/read": "urirequest.id"
}
```

## Explore

* Examine the deployed proxy in the Apigee UI
* Use the Apigee Debug Tool to see your proxy in action
* Change the inputs to the API to see changes reflected in output

