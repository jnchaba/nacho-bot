const TeemoJS = require('teemojs');
const { tftapi } = require('../config.json')
let api = TeemoJS(tftapi);

function getSummonerByName(summonerName) {
    return api.get('na1', 'tftSummoner.getBySummonerName', summonerName);
}

function getLeagueEntries(summonerId) {
    return api.get('na1', 'tftLeague.getLeagueEntriesForSummoner', summonerId);
}

const tftApiUtil = {
    getSummonerByName : getSummonerByName,
    getLeagueEntries : getLeagueEntries,
};

module.exports.tftApiUtil = tftApiUtil;