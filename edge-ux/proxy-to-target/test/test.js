var assert = chai.assert;

var pathname = window.location.pathname
var splits = pathname.split('/')
var org = splits[3]
var env = splits[5]
var sample = splits[7]

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