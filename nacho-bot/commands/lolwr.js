const TeemoJS = require('teemojs');
const request = require('request');
const Discord = require('discord.js');
const { prefix, token, rgapi } = require('../config.json');
const { lolApiUtil } = require('../scripts/lolApiUtil.js');
let api = TeemoJS(rgapi);

const champs = {};
const icons = {};
const matchIds = [];
const champIds = [];
const solo = 'RANKED_SOLO_5x5';
const flex = 'RANKED_FLEX_SR';

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

async function main(message, args) {
    console.log(args);
    if(args[0] != undefined) {
        const msg = await message.channel.send('Fetching LoL Data...');
    try {
        var name = '';
        for (let i = 0; i < args.length; i++) {
            name += args[i];
            if (i < args.length - 1) {
                name += " ";
            }
        }
        const sumData = await lolApiUtil.getSummonerData(name);
        const champData = await lolApiUtil.getMasteryData(sumData.id);
        const rankData = await lolApiUtil.getRankedData(sumData.id);
        const gameData = await lolApiUtil.getActiveGameData(sumData.id);

        const gameIds = [];
        let matchListData = null;
        let champId = 0;
        const wins = [];

        wins[0] = 0;
        wins[1] = 0;
        wins[2] = 0;
        const games = [];
        games[0] = 0;
        games[1] = 0;
        games[2] = 0;
        const levels = [];
        levels[0] = 0;
        levels[1] = 0;
        levels[2] = 0;
        for (let i = 0; i < 3; i++) {
            champId = champData[i].championId;
            matchListData = await getMatchListData(sumData.accountId, champId);
            for(const gId in matchListData.matches) {
                gameIds[gId] = matchListData.matches[gId].gameId;
            }

            for(const id in gameIds) {
                const matchData = await getMatchData(gameIds[id]);
                for(const player in matchData.participants) {
                    if(matchData.participants[player].championId == champId) {
                        if(matchData.participants[player].stats.win == true) {
                            wins[i] += 1;
                        }
                        games[i] += 1;
                        levels[i] += matchData.participants[player].stats.champLevel;
                    }
                }
            }
        }

        console.log("totals: " + games[0] + " | " + games[1] + " | " + games[2]);
        console.log("levels: "+ levels[0] + " | " + levels[1] + " | " + levels[2]);
        let total = games[0] + games[1] + games[2];

        const profileEmbed = new Discord.MessageEmbed()
            .setTitle(sumData.name + '\'s win-rate for Top 3 Mastery champions, over past ' + total + ' games!')
            .setThumbnail('http://ddragon.leagueoflegends.com/cdn/10.16.1/img/profileicon/' + icons[sumData.profileIconId])
            .setTimestamp()
            .setFooter('Called by ' + message.author.username, message.author.avatarURL());

        if(rankData[0] != undefined) {
            for(const key in rankData) {
                if(rankData[key].queueType == 'RANKED_SOLO_5x5') {
                    profileEmbed.addField('Rank:', rankData[key].tier + ' ' + rankData[key].rank, true);
                    break;
                }
            }
        } else {
            profileEmbed.addField('Level:', sumData.summonerLevel, true);
        }

        profileEmbed.addFields(
            { name: '\u200B', value: '\u200B' },
            { name: champs[champData[0].championId] + ' - M' + champData[0].championLevel, value: 'Points: ' + champData[0].championPoints.toLocaleString(), inline: true },
            { name: champs[champData[1].championId] + ' - M' + champData[1].championLevel, value: 'Points: ' + champData[1].championPoints.toLocaleString(), inline: true },
            { name: champs[champData[2].championId] + ' - M' + champData[2].championLevel, value: 'Points: ' + champData[2].championPoints.toLocaleString(), inline: true },
        );
        x
        for (let i = 0; i < 3; i++) {
            profileEmbed.addFields(
                { name: '**Win Rate:** ', value: `${(Math.round(1000 * ((wins[i] / games[i]) * 100)) / 1000)}%`, inline: true },
            );
        }
        for (let i = 0; i < 3; i++) {
            let avglevel = levels[i] / 10;
            profileEmbed.addFields(
                { name: 'Avg Level:', value: `${avglevel}`, inline: true });
        }

        message.delete({ timeout: 100 });
        msg.delete({ timeout: 100 });
        message.channel.send(profileEmbed);
    } catch(error) {
        message.delete({ timeout: 100 });
        msg.edit('Failed to get Lol Data...')
            .then(messageEdit => {
                messageEdit.delete({ timeout: 3000 });
            });
        }
    } else {
        message.channel.send('**Invaild usage!** Reason: You must give a vaild summoner name! \n**Vaild usage:** !lolchamp {summoner name}');
    }
    
}

module.exports = {
    name: 'lolwr',
    cooldown: 3,
    description: 'Fetches league data',
    execute(message, args){
        console.log("init lol");
        main(message, args).then();
    }
}