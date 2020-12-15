const bodyParser = require('body-parser');
const express = require('express');
const redis = require("redis");
const message = require("./message");
const hltvparse = require("./hltv-parse");
const { server_address, server_port, dest_id } = require('./config');

const BASE_HLTV_URL = "https://www.hltv.org/team/";
const VITALITY = "9565/vitality#tab-matchesBox";
const G2 = "5995/g2#tab-matchesBox"
const VITALITY_NAME = "Vitality"
const G2_NAME = "G2";
const DEST_ID = dest_id;

let client = redis.createClient({
    port: server_port,
    host: server_address
});

client.on('error', function(error) {
    console.log(error);
});

//client.set("key", "value", redis.print);
client.get("key", redis.print);

/*hltvparse.getNexMatch(BASE_HLTV_URL + VITALITY, VITALITY_NAME).then(function(msg) {
    message.callSendApi(DEST_ID, msg);
})*/