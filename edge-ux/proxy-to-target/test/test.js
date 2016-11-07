var assert = chai.assert;

var pathname = window.location.pathname
var splits = pathname.split('/')
var org = splits[4]
var env = splits[6]
var sample = splits[8]

var url = 'https://' + org + '-' + env + '.apigee.net/v1/' + sample;

describe('Simple proxy for a backend target', function () {
    it('Make a call that reaches a simple backend service.', function (done) {
        $.ajax({
            url: url,
            complete: function (xhr, statusText) {
                done(xhr.responseText)
            },
            error: function (xhr, err) {
                done(err)
            }
        })
    })
})
