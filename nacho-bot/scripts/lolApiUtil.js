const TeemoJS = require('teemojs');
const { lolapi } = require('../config.json');
let api = TeemoJS(lolapi);

function getSummonerMetrics(name) {
    return api.get('na1', 'summoner.getBySummonerName', name);
}

function getSummonerMatches(accountID) {
    return api.get('na1', 'match.getMatchlist', accountID);
}

function getMatchData(matchID) {
    return api.get('na1', 'match.getMatch', matchID);
}

function getMatchListData(accountID, champId) {
    console.log(champId);
    return api.get('na1', 'match.getMatchlist', accountID, { champion: champId, endIndex: 10 });
}

function getMasteryData(summonerId) {
    return api.get('na1', 'championMastery.getAllChampionMasteries', summonerId);
}

function getRankedData(summonerId) {
    return api.get('na1', 'league.getLeagueEntriesForSummoner', summonerId);
}

function getActiveGameData(summonerId) {
    return api.get('na1', 'spectator.getCurrentGameInfoBySummoner', summonerId);
}

const lolApiUtil = {
    getSummonerMetrics: getSummonerMetrics,
    getSummonerMatches: getSummonerMatches,
    getMatchData: getMatchData,
    getMatchListData: getMatchListData,
    getMasteryData: getMasteryData,
    getRankedData: getRankedData,
    getActiveGameData: getActiveGameData,
};

module.exports.lolApiUtil = lolApiUtil;