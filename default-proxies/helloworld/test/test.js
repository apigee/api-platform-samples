var expect  = require("chai").expect;
var request = require("request");
// Configure and uncomment the following for local testing using `npm test`.
// Then comment out all vars further down except url.
// var org = "your_org"; 
// var env = "test";

// The org and env variables get their values from the Seed Test URL.
// Expected: /v1/o/:orgname/e/:env/samples/:sample/test.html
var pathname = window.location.pathname
var splits = pathname.split('/')
var org = splits[3]
var env = splits[5]
var sample = splits[7]

var url = "https://" + org + "-" + env + ".apigee.net/v0/hello"
describe("Running test for helloworld", function(){
    describe("Doing a GET on " + url, function(){
        it("returns status 200", function(done) {
            request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
         });
      });
   });
});