jQuery(document).ready(function($) {
 
    var checkpointId = getUrlVars()["checkpoint"];
    if (checkpointId != undefined) {
         localStorage.setItem('checkpointId', checkpointId);
    }
    else {
        checkpointId = localStorage.getItem('checkpointId');
        if (checkpointId == undefined) {
            checkpointId = "1";
        }
    }

    var queueStatus = "";

    //var functionsBaseUrl = "https://us-central1-airport-security.cloudfunctions.net";
    var functionsBaseUrl = "https://airport-security-onv7eg4pxq-ew.a.run.app";

    setInterval(function() {
        
        $.ajax({
            type: "GET",
            url: functionsBaseUrl + "/security/checkpoint/" + checkpointId + "/status",
            headers: {
                    "Content-Type": "application/json"
            },        
            success: function(data) {
                var dataObj = JSON.parse(data);

                if (dataObj.status != queueStatus) {
                    queueStatus = dataObj.status;

                    if (queueStatus == "high") {
                        Push.create('AIRPORT LONG QUEUE', {
                            body: 'Expect a long queue at the airport today, so get there extra early.',
                            icon: 'images/airport-icon-warning.png',
                            timeout: 8000,               // Timeout before notification closes automatically.
                            vibrate: [100, 100, 100],    // An array of vibration pulses for mobile devices.
                            onClick: function() {
                                // Callback for when the notification is clicked. 
                                console.log(this);
                            }  
                        });

                        $("#queue-normal").fadeOut();
                        $("#queue-warning").fadeIn();
                    }
                    else {
                        Push.create('AIRPORT queue shortened', {
                            body: "AIRPORT queue has shortened, you're in luck, little waiting expected.",
                            icon: 'images/airport-icon.png',
                            timeout: 8000,               // Timeout before notification closes automatically.
                            vibrate: [100, 100, 100],    // An array of vibration pulses for mobile devices.
                            onClick: function() {
                                // Callback for when the notification is clicked. 
                                console.log(this);
                            }  
                        });  

                        $("#queue-warning").fadeOut();    
                        $("#queue-normal").fadeIn();             
                    }
                }
            }
        });


    }, 2000);
});

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}