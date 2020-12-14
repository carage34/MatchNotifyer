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

hltvparse.getNexMatch(BASE_HLTV_URL + VITALITY, VITALITY_NAME).then(function(msg) {
    message.callSendApi(DEST_ID, msg);
})

