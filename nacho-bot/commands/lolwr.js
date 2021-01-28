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
    if (args[0] != undefined) {
        const msg = await message.channel.send('Fetching LoL Data...');
        try {
            var name = '';
            for (let i = 0; i < args.length; i++) {
                name += args[i];
                if (i < args.length - 1) {
                    name += " ";
                }
            }
            const sumData = await lolApiUtil.getSummonerMetrics(name);
            let champData = (await lolApiUtil.getMasteryData(sumData.id)).slice(0, 3);
            const rankData = await lolApiUtil.getRankedData(sumData.id);
            
            const wins = [];
            const games = [];
            const levels = [];
            let totalGames = 0;

            for (champ of champData) {
                let curWins = 0;
                let curGames = 0;
                let curLevels = 0;

                const matchListDataResponse = await lolApiUtil.getMatchListData(sumData.accountId, champ.championId);
                for (matchHeader of matchListDataResponse.matches) {
                    const matchDataResponse = await lolApiUtil.getMatchData(matchHeader.gameId);
                    for (participant of matchDataResponse.participants) {
                        if (participant.championId == champ.championId) {
                            if (participant.stats.win) {
                                curWins++;
                            }
                            totalGames++;
                            curGames++;
                            curLevels += participant.stats.champLevel;
                        }
                    }
                }

                wins.push(curWins);
                games.push(curGames);
                levels.push(curLevels);
            }

            const profileEmbed = new Discord.MessageEmbed()
                .setTitle(sumData.name + '\'s win-rate for Top 3 Mastery champions, over past ' + totalGames + ' games!')
                .setThumbnail('http://ddragon.leagueoflegends.com/cdn/10.16.1/img/profileicon/' + icons[sumData.profileIconId])
                .setTimestamp()
                .setFooter('Called by ' + message.author.username, message.author.avatarURL());

            let isRanked = false;
            rankData.forEach(rankItem => {
                if (rankItem == 'RANKED_SOLO_5x5') {
                    isRanked = true;
                    profileEmbed.addField('Rank:', rankItem.tier + ' ' + rankItem.rank, true);
                }
            });
            
            if (!isRanked)    {
                profileEmbed.addField('Level:', sumData.summonerLevel, true);
            }

            profileEmbed.addFields(
                { name: '\u200B', value: '\u200B' }, //\u200B is a zero width space, for formatting
            )
            
            for (let i = 0; i < 3; i++) {
                profileEmbed.addFields({ 
                    name: champs[champData[i].championId] + ' - M' + champData[i].championLevel, 
                    value: 'Points: ' + champData[i].championPoints.toLocaleString(),
                    inline: true 
                });
            }
            
            for (let i = 0; i < 3; i++) {
                profileEmbed.addFields({ 
                    name: '**Win Rate:** ', 
                    value: `${(Math.round(1000 * ((wins[i] / games[i]) * 100)) / 1000)}%`, 
                    inline: true 
                });
            }
            for (let i = 0; i < 3; i++) {
                let avglevel = levels[i] / 10;
                profileEmbed.addFields({ 
                    name: 'Avg Level:', 
                    value: `${avglevel}`, 
                    inline: true
                });
            }

            message.delete({ timeout: 100 });
            msg.delete({ timeout: 100 });
            message.channel.send(profileEmbed);
        } catch (error) {
            console.log(error);
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
    execute(message, args) {
        console.log("init lol");
        main(message, args).then();
    }
}