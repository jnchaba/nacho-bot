const TeemoJS = require('teemojs');
const request = require('request');
const { prefix, token, rgapi } = require('./config.json');
let api = TeemoJS(rgapi);

const champs = {};
const icons = {};
const matchIds = [];
const champIds = [];

// method call example in index.js

request({
    url: 'http://ddragon.leagueoflegends.com/cdn/10.23.1/data/en_US/championFull.json',
    json: true,
}, function (error, response, body) {
    for (const key in body.keys) {
        body.keys[key] = body.keys[key].replace(/([a-z])([A-Z])/g, '$1 $2');
        champs[key] = body.keys[key];
    }
});

request({
    url: 'http://ddragon.leagueoflegends.com/cdn/10.23.1/data/en_US/profileicon.json',
    json: true,
}, function (error, response, body) {
    for (const key in body.data) {
        icons[key] = body.data[key].image.full;
    }
});

function getSummonerMetrics(name) {
    return new Promise((resolve, reject) => {
        api.get('na1', 'summoner.getBySummonerName', name)
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getSummonerMatches(accountID) {
    return new Promise((resolve, reject) => {
        api.get('na1', 'match.getMatchlist', accountID)
        .then(data => {
            resolve(data);
        })
        .catch(error => {
            reject(error);
        })
    })
}

function getMatchData(matchID) {
    return new Promise((resolve, reject) => {
        api.get('na1', 'match.getMatch', matchID)
        .then(data => {
            resolve(data);
        })
        .catch(error =>{
            reject(error);
        });
    });
}

module.exports = {
    name: 'lol',
    cooldown: 3,
    description: 'Fetches league data',
    run: async (command) => {
        const sumData = await getSummonerMetrics(command);

        console.log(sumData);

        const sumMatches = await getSummonerMatches(sumData.accountId);

        var wins = 0;
        var losses = 0;
        var total = 0;
        var winrate = 0.00;

        for (const gameId in sumMatches.matches) {
            matchIds[gameId] = sumMatches.matches[gameId].gameId;
            champIds[gameId] = sumMatches.matches[gameId].champion;
        }
        // console.log("Sumdata.name: " + sumData.name);
        // console.log("# matches: " + matchIds.length);
        // console.log("# champs: " + champIds.length);
        // console.log("sumdata.id: " + sumData.id);

        for (const gameId in matchIds) {
            const matchData = await getMatchData(matchIds[gameId]);
            for (const player in matchData.participants) {
                if (matchData.participants[player].championId == champIds[gameId]) {
                    if (matchData.participants[player].stats.win == true){
                        wins++;
                    } else {
                        losses++;
                    }
                    total = wins + losses;
                    console.log("Total games analyzed: " + total);
                }
            }
        }
        winrate = (wins / total) * 100;
        console.log(sumData.name + ": winrate = " + winrate + "%");
    }
}