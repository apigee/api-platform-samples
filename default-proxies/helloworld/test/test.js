var expect  = require("chai").expect;
var request = require("request");
// Configure and uncomment the following for local testing:
// var org = "your_org"; 
// var env = "test";


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