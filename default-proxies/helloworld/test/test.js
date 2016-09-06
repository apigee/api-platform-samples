var assert = chai.assert;

var pathname = window.location.pathname
var splits = pathname.split('/')
//expected /v1/o/:orgname/e/:env/samples/:sample/test.html
var org = splits[3]
var env = splits[5]
var sample = splits[7]

getTestData(org,env,sample,function(data){
	//No data for this proxy
})

var url = 'https://' + org + '-' + env + '.apigee.net/v0/hello'
describe('helloworld', function(){
	describe('calling ' + url, function(){
		it('1 API call', function(done){
			async.times(1,function(n,next){
				$.ajax({
					url:url,
					complete:function(xhr,statusText){ next(null,xhr.status)}
				})
			},function(cberror,codes){
				var success_200 = 0				
				codes.forEach(function(s){ if (s==200) success_200++}) 
				assert.equal(2,success_200)
				done(cberror)
			})
		})
	})
})