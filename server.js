bodyParser = require('body-parser');
express = require('express');
const message = require("./message");
const hltvparse = require("./hltv-parse");
const { port, verify_token } = require('./config');

const BASE_HLTV_URL = "https://www.hltv.org/team/";
const VITALITY = "9565/vitality#tab-matchesBox";
const G2 = "5995/g2#tab-matchesBox"
const VITALITY_NAME = "Vitality"
const G2_NAME = "G2";
const DEST_ID = 3557668797646399

app = express().use(bodyParser.json());

app.get('/webhook', (req, res) => {
    console.log("plz");

    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = verify_token

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    //if (mode && token) {

    // Checks the mode and token sent is correct
    if ((mode === 'subscribe') && (token === VERIFY_TOKEN)) {

        // Responds with the challenge token from the request
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);

    } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);
    }
    // }
});

app.post('/webhook', (req, res) => {
    let body = req.body;

    // Checks this is an event from a page subscription
    if (body.object === 'page') {

        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(function (entry) {

            // Gets the message. entry.messaging is an array, but 
            // will only ever contain one message, so we get index 0
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);
        });

        // Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }

});


//getNexMatch(BASE_HLTV_URL + VITALITY);

hltvparse.getNexMatch(BASE_HLTV_URL + VITALITY, VITALITY_NAME).then(function(msg) {
    console.log(msg);
})
app.listen(port, () => console.log('webhook is listening'));

