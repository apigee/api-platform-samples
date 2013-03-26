// create the JSON editor
var container = document.getElementById("jsoneditor");
var editor = new jsoneditor.JSONEditor(container);

var originalJSON;

var makeURL = function() {
  return apiBasePath +
    '/' + encodeURIComponent($('#org').val()) +
    '/' + encodeURIComponent($('#app').val()) +
    '/' + encodeURIComponent($('#collection').val()) +
    '/' + encodeURIComponent($('#entity').val());
};

// Load the JSON data from the server, in its entirety
var load = function() {
  function lockBtn() {
    $('#loadBtn')
      .text('Loading...')
      .attr('disabled', 'disabled');
  }

  function unlockBtn() {
    $('#loadBtn')
      .text('Load')
      .removeAttr('disabled');
  }

  lockBtn();

  $.getJSON(makeURL())
    .done(function(json) {
      if (!json || !json.entities || json.entities.length != 1) {
        console.error('Bad response', json);
        return;
      }

      originalJSON = json.entities[0].data;
      editor.set(originalJSON);
    })
    .fail(function(jqxhr, status, error) {
      console.error('Could not load JSON: ' + status + ', ' + error);
      if (jqxhr.status == 404) {
        originalJSON = null;
        editor.set({});
      }
    })
    .always(function() {
      unlockBtn();
    });
};

// Save changes to the JSON data back by sending a JSON Patch list
var save = function() {
  function lockBtn() {
    $('#saveBtn')
      .text('Saving...')
      .attr('disabled', 'disabled');
  }

  function unlockBtn() {
    $('#saveBtn')
      .text('Save')
      .removeAttr('disabled');
  }

  lockBtn();

  var json = editor.get();

  var ajaxOptions = {
    url: makeURL(),
    contentType: 'application/json'
  };

  if (typeof originalJSON === 'undefined' || originalJSON == null) {
    // if we haven't previously loaded, or the object didn't exist, do a full PUT
    ajaxOptions.type = 'PUT';
    ajaxOptions.data = JSON.stringify({ data: json });
  } else {
    var patches = jsonpatch.diff(originalJSON, json);

    if (patches.length == 0) {
      // there weren't any changes
      unlockBtn();
      return;
    }

    ajaxOptions.type = 'PATCH';
    ajaxOptions.data = JSON.stringify(patches);
  }

  $.ajax(ajaxOptions)
    .done(function() {
      // show the patches made, in a list under the editor
      $('<li>', {
         text: JSON.stringify(patches, null, 2)
        })
        .hide()
        .prependTo($('#patches'))
        .show('fast');
    })
    .fail(function(jqxhr, status, error) {
      console.error('Could not save JSON: ' + status + ', ' + error);
    })
    .always(function() {
      unlockBtn();
    });
};

$('#loadBtn').click(load);
$('#saveBtn').click(save);

$(function() {
  $('#basepath').html(apiBasePath + '/');
  load();
});
