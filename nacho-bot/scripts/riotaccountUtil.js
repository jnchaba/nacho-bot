const request = require('request');

const icons = {};

request({
    url: 'http://ddragon.leagueoflegends.com/cdn/10.23.1/data/en_US/profileicon.json',
    json: true,
}, function (error, response, body) {
    for (const key in body.data) {
        icons[key] = body.data[key].image.full;
    }
});

function getSummonerIconURL(sumData) {
    var summonerIcon = sumData.profileIconId;
    return ('http://ddragon.leagueoflegends.com/cdn/10.23.1/img/profileicon/' + 
        icons[summonerIcon]);
}

const riotAccountUtil = {
    getSummonerIconURL: getSummonerIconURL,
}

module.exports.riotAccountUtil = riotAccountUtil;