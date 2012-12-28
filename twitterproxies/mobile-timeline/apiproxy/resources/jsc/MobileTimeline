/* This JavaScript resource tailors the response from the statuses/user_timeline.json
 * resource to be "mobile friendly" by only keeping essential timeline data */

// Get the original JSON response as an object so we can populate a new timeline
// array with selected data from the original timeline
var origResponse = response.content.asJSON;

// Only tailor if the response is an array (it's probably a fault response otherwise)
if (Array.isArray(origResponse)) {
  var timeline = [],
    status;

  for (var i = 0, len = origResponse.length; i < len; ++i) {
    status = origResponse[i];

    // Add a stripped-down status object to the new timeline
    timeline.push({
      created_at: status.created_at,
      user: {
        screen_name: status.user.screen_name,
        name: status.user.name,
        profile_image_url: status.user.profile_image_url,
      },
      id_str: status.id_str,
      text: status.text
    });
  }

  // Send the tailored timeline back as JSON
  response.content = JSON.stringify(timeline);
}
