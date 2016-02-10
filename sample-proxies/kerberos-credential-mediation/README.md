# Kerberos Credential Mediation

This sample shows how to perform Kerberos Credential Mediation on Apigee Edge.
 
It uses Java GSS API to perform

1. Verify incoming Kerberos token in Authorization Header
2. Generate a new Authorization Header for the backend server

Both of these steps can be performed independently to support credential mediation b/w other auth schemes such as Oauth

Note: This sample is applicable only for on-premise installation.

# Set up

Edit the properties in ```apiporxy/policies/credentialdelegation.xml``` 

```
<Properties>
      <Property name="krb5Conf">krb5.conf</Property>
      <Property name="loginConf">login.conf</Property>
      <Property name="loginModule">ServicePrincipalLoginContext</Property>
      <Property name="serverPrincipal">http@server-backend</Property>
</Properties>  
```
```krb5.conf```, ```login.conf``` and the necessary keytab files need to be present in the ```APIGEE_INSTALL_ROOT```

```loginModule``` is the module name to choose from the ```login.conf```

# Import and deploy sample project

To deploy, run `$ sh deploy.sh`


# Sample configuration

login.conf

```
ServicePrincipalLoginContext
{
      com.sun.security.auth.module.Krb5LoginModule required 
      principal="http/service-principal-account@APIGEE.LOCAL" 
      doNotPrompt=true
      useTicketCache=true   
      keyTab="spn.keytab"
      useKeyTab=true
      storeKey=true
      debug=true;      
}
```

krb5.conf

```
[libdefaults]
    default_realm=APIGEE.LOCAL
    default_tkt_enctypes = aes128-cts rc4-hmac des3-cbc-sha1 des-cbc-md5 des-cbc-crc
    default_tgs_enctypes = aes128-cts rc4-hmac des3-cbc-sha1 des-cbc-md5 des-cbc-crc
    permitted_enctypes   = aes128-cts rc4-hmac des3-cbc-sha1 des-cbc-md5 des-cbc-crc

[realms]
    APIGEE.LOCAL  = {
        kdc = kdc.youdomain.com 
        default_domain = APIGEE.LOCAL
}

[domain_realm]
    .APIGEE.LOCAL = APIGEE.LOCAL 
 ```
    

# Get help

For assistance, please use [Apigee Community](https://community.apigee.com).

Copyright © 2014 Apigee Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy
of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
