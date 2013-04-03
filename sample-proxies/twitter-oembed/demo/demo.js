$(function() {
  $.getJSON('http://demo-prod.apigee.net/twitter-oembed/search.json',
    {
      q: 'Apigee'
    },
    function(oembed) {
      $('#container').html(oembed.html);
    }
  );
});
