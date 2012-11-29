$(function() {
  $.ajax({
    url:'http://demo-prod.apigee.net/twitter-oembed/1/statuses/user_timeline.json',
    data: {
      screen_name: 'Apigee'
    },
    type: 'GET',
    beforeSend: function(xhr) {
      xhr.setRequestHeader('Accept', 'application/json');
    },
    success: function(oembed) {
      $('#container').html(oembed.html);
    }
  });
});
