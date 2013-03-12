function relative_time(time_value) {
  var values = time_value.split(" ");
  time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
  var parsed_date = Date.parse(time_value);
  var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
  var delta = parseInt((relative_to.getTime() - parsed_date) / 1000, 10);
  delta = delta + (relative_to.getTimezoneOffset() * 60);

  if (delta < 60) {
    return 'less than a minute ago';
  } else if(delta < 120) {
    return 'about a minute ago';
  } else if(delta < (60*60)) {
    return (parseInt(delta / 60, 10)).toString() + ' minutes ago';
  } else if(delta < (120*60)) {
    return 'about an hour ago';
  } else if(delta < (24*60*60)) {
    return 'about ' + (parseInt(delta / 3600, 10)).toString() + ' hours ago';
  } else if(delta < (48*60*60)) {
    return '1 day ago';
  } else {
    return (parseInt(delta / 86400, 10)).toString() + ' days ago';
  }
}

function linkify(url) {
  return '<a href="'+url+'">'+url+'</a>';
}

function linkifyReply(reply) {
  return reply.charAt(0)+'<a href="http://twitter.com/'+reply.substring(1)+'">'+reply.substring(1)+'</a>';
}

$(function() {
  $.getJSON('http://demo-prod.apigee.net/mobile-friendly-twitter/1/statuses/user_timeline.json',
    {
      screen_name: 'Apigee'
    },
    function(timeline) {
      var statusHTML = [],
        status;

      for (var i = 0, len = timeline.length; i < len; ++i){
        status = timeline[i];

        var username = status.user.screen_name,
          statusText = status.text
            .replace(/((https?|s?ftp|ssh)\:\/\/[^"\s<\>]*[^.,;'">\:\s<\>\)\]\!])/g, linkify)
            .replace(/\B@([_a-z0-9]+)/ig, linkifyReply);

        statusHTML.push('<li>' +
          '<img src="'+status.user.profile_image_url+'" class="avatar"/>'+
          '<div>'+
            '<span class="name">'+status.user.name+'</span> '+
            '<span class="screen_name">@'+status.user.screen_name+'</span>'+
            '<a class="time" href="http://twitter.com/'+username+'/statuses/'+status.id_str+'">'+relative_time(status.created_at)+'</a>' +
          '</div>'+
          '<span>'+statusText+'</span>' +
        '</li>');
      }

      $('#tweets').html(statusHTML);
    }
  );

});
