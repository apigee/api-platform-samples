function relative_time(date_str) {
  var parsed_date = Date.parse(date_str);
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

function linkifyStatusText(statusText) {
  return statusText
    .replace(/((https?|s?ftp|ssh)\:\/\/[^"\s<\>]*[^.,;'">\:\s<\>\)\]\!])/g, linkify)
    .replace(/\B@([_a-z0-9]+)/ig, linkifyReply);
}

function search(q, lang) {
  $.getJSON('http://demo-prod.apigee.net/twitter-translate/search.json',
    {
      q: q,
      lang: lang,
    },
    function(res) {
      var statusHTML = [],
        statusTextHTML,
        status;

      for (var i = 0, len = res.results.length; i < len; ++i){
        status = res.results[i];

        if (status.text_orig) {
          statusTextHTML =
            '<span class="untranslated">'+linkifyStatusText(status.text_orig)+'</span>' +
            '<span class="translated">'+linkifyStatusText(status.text)+'</span>';
        } else {
          statusTextHTML = '<span>'+linkifyStatusText(status.text)+'</span>';
        }

        statusHTML.push('<li>' +
          '<img src="'+status.profile_image_url+'" class="avatar"/>'+
          '<div>'+
            '<span class="name">'+status.from_user_name+'</span> '+
            '<span class="screen_name">@'+status.from_user+'</span>'+
            '<a class="time" href="http://twitter.com/'+status.from_user+'/statuses/'+status.id_str+'">'+relative_time(status.created_at)+'</a>' +
          '</div>'+
          statusTextHTML +
        '</li>');
      }

      $('#tweets').html(statusHTML);
    }
  );
}

$(function() {
  $('#searchform').submit(function () {
    var q = $('#search_q').val(),
      lang = $('#search_lang').val();

    search(q, lang);

    return false;
  });

});
