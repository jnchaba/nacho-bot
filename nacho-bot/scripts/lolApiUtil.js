const TeemoJS = require('teemojs');
const { rgapi } = require('../config.json');
let api = TeemoJS(rgapi);

function getSummonerMetrics(name) {
    return api.get('na1', 'summoner.getBySummonerName', name);
}

function getSummonerMatches(accountID) {
    return api.get('na1', 'match.getMatchlist', accountID);
}

function getMatchData(matchID) {
    return api.get('na1', 'match.getMatch', matchID);
}

function getMatchListData(summonerId, champId) {
    return api.get('na1', 'match.getMatchlist', summonerId, { champion: champId, endIndex: 40 });
}

function getMasteryData(summonerId) {
    return api.get('na1', 'championMastery.getAllChampionMasteries', summonerId);
}

function getRankedData(summonerId) {
    return api.get('na1', 'league.getLeagueEntriesForSummoner', summonerId);
}

const lolApiUtil = {
    getSummonerMetrics: getSummonerMetrics,
    getSummonerMatches: getSummonerMatches,
    getMatchData: getMatchData,
    getMatchListData: getMatchListData,
    getMasteryData: getMasteryData,
    getRankedData: getRankedData,
};

module.exports.lolApiUtil = lolApiUtil;