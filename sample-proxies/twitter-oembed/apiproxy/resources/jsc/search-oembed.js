/* This JavaScript resource transforms timeline responses (e.g. from
 * statuses/user_timeline.json) into an oEmbed response that contains
 * the timeline data as rich HTML content. */

// Helper functions to HTMLize statuses
function linkify(url) {
  return '<a href="'+url+'">'+url+'</a>';
}

function linkifyReply(reply) {
  return reply.charAt(0)+'<a href="http://twitter.com/'+reply.substring(1)+'">'+reply.substring(1)+'</a>';
}

// Convert tweet created_at to ISO-8601
function createdAtISO(created_at) {
  function pad(n) {
    return n < 10 ? '0'+n : n;
  }

  var d = new Date(Date.parse(created_at));

  return d.getUTCFullYear()+'-' +
    pad(d.getUTCMonth()+1)+'-' +
    pad(d.getUTCDate())+'T' +
    pad(d.getUTCHours())+':' +
    pad(d.getUTCMinutes())+':' +
    pad(d.getUTCSeconds())+'Z';
}

// Convert tweet created_at to a human-readable string by locale
function createdAtString(created_at) {
  return new Date(Date.parse(created_at)).toLocaleString();
}

// Get the original JSON response as an object
var origResponse = response.content.asJSON;

if (origResponse === Object(origResponse) &&
    Array.isArray(origResponse.results)) {
  var results = origResponse.results,
    oembed,
    html = '',
    status;

  oembed = {
    type: 'rich',
    version: '1.0',
    author_name: 'Twitter Timeline oEmbed',
    author_url: 'http:\/\/apigee.com',
    provider_name: 'Twitter',
    provider_url: 'http:\/\/twitter.com',
    width: 550,
    height: null
  };

  // Create a blockquote element for each status
  for (var i = 0, len = results.length; i < len; ++i) {
    status = results[i];

    var statusText = status.text
      .replace(/((https?|s?ftp|ssh)\:\/\/[^"\s<\>]*[^.,;'">\:\s<\>\)\]\!])/g, linkify)
      .replace(/\B@([_a-z0-9]+)/ig, linkifyReply);

    var datetime = createdAtISO(status.created_at),
      datetimeStr = createdAtString(status.created_at);

    html += '<blockquote class="twitter-tweet">';
    html += '<p>'+statusText+'</p>';
    html += '&mdash; '+status.from_user_name+'(@'+status.from_user+')';
    html += ' <a href="https://twitter.com/'+status.from_user+'/statuses/'+status.id_str+'" data-datetime="'+datetime+'">'+datetimeStr+'</a>';
    html += '</blockquote>';
  }

  // Add Twitter's widget embed code that transforms the blockquotes into rich
  // tweet views client-side
  html += '<script src="//platform.twitter.com/widgets.js" charset="utf-8"></script>';

  oembed.html = html;

  // If the request is made with an Accept: application/json header, send the
  // oEmbed object, or the raw HTML otherwise
  if (request.headers['Accept'] &&
      request.headers['Accept'][0] === 'application/json') {
    // Send the oEmbed object back as JSON
    response.content = JSON.stringify(oembed);
  } else {
    response.content = html;
    response.headers['Content-Type'] = 'text/html';
  }
}
