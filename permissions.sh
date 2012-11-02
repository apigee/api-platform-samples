source setenv.sh

apiName=4g-samples-apikey
basePath=/4g-samples-apikey

find . -name '*.DS_Store' -type f -delete

##Cleanup

##Create APIProxy Resource
curl -u $credentials "$url/v1/organizations/$org/resources/" -d '<Resource path="/applications"><DisplayName>APIs</DisplayName></Resource>' -H "Content-Type:application/xml"

##Create OrgAdmin Permissions:
curl -u $credentials "$url/v1/organizations/$org/userroles/orgadmin/permissions/" -d '<ResourcePermission path="/applications"><Permissions><Permission>get</Permission><Permission>put</Permission><Permission>delete</Permission></Permissions></ResourcePermission>' -H "Content-Type:application/xml"

##Create apiproducts Resource
curl -u $credentials "$url/v1/organizations/$org/resources/" -d '<Resource path="/apiproducts"><DisplayName>APIProducts</DisplayName></Resource>' -H "Content-Type:application/xml"

##Create apiproducts Permissions:
curl -u $credentials "$url/v1/organizations/$org/userroles/orgadmin/permissions/" -d '<ResourcePermission path="/apiproducts"><Permissions><Permission>get</Permission><Permission>put</Permission><Permission>delete</Permission></Permissions></ResourcePermission>' -H "Content-Type:application/xml"

##Create apps Resource
curl -u $credentials "$url/v1/organizations/$org/resources/" -d '<Resource path="/apps"><DisplayName>Apps</DisplayName></Resource>' -H "Content-Type:application/xml"

##Create apps Permissions:
curl -u $credentials "$url/v1/organizations/$org/userroles/orgadmin/permissions/" -d '<ResourcePermission path="/apps"><Permissions><Permission>get</Permission><Permission>put</Permission><Permission>delete</Permission></Permissions></ResourcePermission>' -H "Content-Type:application/xml"

##Create developers Resource
curl -u $credentials "$url/v1/organizations/$org/resources/" -d '<Resource path="/developers"><DisplayName>Developers</DisplayName></Resource>' -H "Content-Type:application/xml"

##Create developers Permissions:
curl -u $credentials "$url/v1/organizations/$org/userroles/orgadmin/permissions/" -d '<ResourcePermission path="/developers"><Permissions><Permission>get</Permission><Permission>put</Permission><Permission>delete</Permission></Permissions></ResourcePermission>' -H "Content-Type:application/xml"
