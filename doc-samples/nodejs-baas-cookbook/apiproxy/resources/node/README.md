# "Employees" Apigee Node.js Sample

A simple API built using Express and Usergrid that maintains a 
database of "employee" names and phone numbers.
    
To deploy:

    npm install
    apigeetool deploynodeapp -u USERNAME -p PASSWORD \
      -o ORG -e test -n employees -d .
      -m server.js -b /employees

Where:

* USERNAME: Your Apigee user name
* PASSWORD: Your Apigee password
* ORG: Your Apigee organization name

To use:

    curl http://ORG-test.apigee.net/employees/employees
    
    curl http://ORG-test.apigee.net/employees/employees \
      -H "Content-Type: application/json" \
      -d '{"id":"moe", "firstName":"Moe", "lastName":"Moeness", "phone": "201-867-5309" }'
      -X POST
