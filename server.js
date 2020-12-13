const cheerio = require('cheerio');
var rp = require('request-promise');

const BASE_HLTV_URL = "https://www.hltv.org/team/";
const VITALITY = "9565/vitality#tab-matchesBox";
const G2 = "5995/g2#tab-matchesBox"
const VITALITY_NAME = "Vitality"
const G2_NAME = "G2";

function getNexMatch(url, team) {
    rp(url)
    .then(function(html) {
        var $ = cheerio.load(html);
        var upcoming =  $('.match-table').first();
        var eventTitle = upcoming.find(".text-ellipsis");
        var date = upcoming.find(".date-cell").find("span");
        var team1 = upcoming.find(".team-1");
        var team2 = upcoming.find(".team-2");

        return "Prochain match de " + team + " : Le " + date + " - " + team1 + " Vs " + team2 + " - " + eventTitle
    })
    .catch(function(err) {
        console.log(err);
    })
}

function getLastResult(url, team) {
   
    rp(url)
    .then(function(html) {
        var $ = cheerio.load(html);
        var html = $("html");
        var lastResult = $('.match-table').eq(1);
        var thead = lastResult.children('thead').eq(1);
        var eventTitle = thead.find(".text-ellipsis");
        var tbody = lastResult.children("tbody").eq(0);
        var tr = tbody.children("tr").eq(0);
        var date = tr.find(".date-cell").find("span");
        var team1 = tr.find(".team-1");
        var team2 = tr.find(".team-2");
        console.log(eventTitle.text());
        console.log(team1.text());
        console.log(team2.text());
        console.log(date.text());
        console.log("Dernier résultat de " + team + " : Le " + date.text() + " - " + team1.text() + " Vs " + team2.text() + " - " + eventTitle.text());
        return "Dernier résultat de " + team + " : Le " + date.text() + " - " + team1.text() + " Vs " + team2.text() + " - " + eventTitle.text()
    })
    .catch(function(err) {
        console.log(err);
    })
}

//getNexMatch(BASE_HLTV_URL + VITALITY);
console.log(getLastResult(BASE_HLTV_URL + VITALITY, VITALITY_NAME));