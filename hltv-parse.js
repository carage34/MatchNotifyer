const rp = require("request-promise");
const cheerio = require("cheerio");

const getNexMatch = (url, team) => {
    return new Promise((resolve, reject) => {
        rp(url)
            .then(function (html) {
                var $ = cheerio.load(html);
                var empty = $(".empty-state")
                var span = empty.find("span");
                if (span.text().includes('later')) {
                    let msg = "Il n'y a pas de prochain match de prévu pour " + team
                    resolve(msg);
                } else {
                    var upcoming = $('.match-table').first();
                    var eventTitle = upcoming.find(".text-ellipsis");
                    var date = upcoming.find(".date-cell").find("span");
                    var date2 = "";
                    if(!date.text().includes('/')) {
                        date2 = "Aujourd'hui à " + date.text();
                    } else {
                        date2 = "Le " + date.text();
                    }
                    var team1 = upcoming.find(".team-1");
                    var team2 = upcoming.find(".team-2");
                    let msg = "Prochain match de " + team + " : " + date2 + " - " + team1.text() + " Vs " + team2.text() + " - " + eventTitle.text();
                    resolve(msg);
                }
            })
            .catch(function (err) {
                console.log(err);
            })
    })

}

const getLastResult = (url, team) => {
    return new Promise((resolve, reject) => {
        rp(url)
            .then(function (html) {
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
                let msg = "Dernier résultat de " + team + " : Le " + date.text() + " - " + team1.text() + " Vs " + team2.text() + " - " + eventTitle.text()
                resolve(msg);
            })
            .catch(function (err) {
                console.log(err);
            })
    })
}

exports.getNexMatch = getNexMatch;
exports.getLastResult = getLastResult;
