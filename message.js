const request = require("request")
const { access_token } = require('./config');

const callSendApi = (sender_psid, response) => {
    console.log(response);
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": {
            "text": response
        },
        "messaging_type": "MESSAGE_TAG",
        "tag": "NON_PROMOTIONAL_SUBSCRIPTION"
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": access_token },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
            //console.log(res);
            //console.log(body);
            //console.log(err);
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}

exports.callSendApi = callSendApi;
