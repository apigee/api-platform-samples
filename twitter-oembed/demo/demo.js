$(function() {
  $.getJSON('http://demo-prod.apigee.net/twitter-oembed/1/statuses/user_timeline.json',
    {
      screen_name: 'Apigee'
    },
    function(oembed) {
      $('#container').html(oembed.html);
    }
  );
});
