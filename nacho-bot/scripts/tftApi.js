const TeemoJS = require('teemojs');
const { rgapi } = require('../config.json')
let teemo = TeemoJS(rgapi);

async function getSummonerByName(summonerName) {
    return await teemo.get('na1', 'tftSummoner.getBySummonerName', summonerName);
}

async function getLeagueEntries(summonerId) {
    return await teemo.get('na1', 'tftLeague.getLeagueEntriesForSummoner', summonerId);
}

async function getSummonerData(summonerName) {
    let output = {};
    
    const summoner = await getSummonerByName(summonerName);
    if (summoner === null) {
        return undefined;
    }
    const entries = await getLeagueEntries(summoner.id);
    const entry = entries[0];

    output.name = summoner.name;
    output.icon = summoner.profileIconId;
    output.level = summoner.summonerLevel;

    if (entry === undefined) {
        output.rank = "unranked scrub";
        output.lp = "-1";
        output.winrate = "probably terrible";
    }
    else {
        output.rank = `${entry.tier} - ${entry.rank}`;
        output.lp = entry.leaguePoints;
        const winrateCalc = (parseInt(entry.wins) / parseInt(entry.losses) * 100).toFixed(2);
        output.winrate = `${entry.wins}/${entry.losses} (${winrateCalc}%)`;
    }
    return output;
}

module.exports = { getSummonerByName, getLeagueEntries, getSummonerData };