const TeemoJS = require('teemojs');
const request = require('request');
const Discord = require('discord.js');
const { prefix, token, rgapi } = require('../config.json');
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

function getMasteryData(summonerId) {
    return new Promise((resolve, reject) => {
        api.get('na1', 'championMastery.getAllChampionMasteries', summonerId)
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getRankedData(summonerId) {
    return new Promise((resolve, reject) => {
        api.get('na1', 'league.getLeagueEntriesForSummoner', summonerId)
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

async function main(message, args) {
    var argv = 0;
    var name = '';
    while (argv < args.length) {
        if (args[argv] != 'solo' && args[argv] != 'flex') {
            name += args[argv];
            argv++;
        } else {
            break;
        }
    }
    console.log("# args.length :" + args.length);
    console.log("# argv :" + argv);
    console.log("# arguments for noqueue :" + (argv + 1));
    console.log("comparing : " + (args.length + argv) + " and " + argv);
    if (args.length == 0 ) {
        const errorEmbed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Gimmie a Name!')
                .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                .setDescription("You forgot to give me a summoner name!")
                .setThumbnail('https://cdn2.iconfinder.com/data/icons/picons-basic-2/57/basic2-189_bug-512.png')
                .setTimestamp()
                .setFooter('this fuckin guy', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Glazed-Donut.jpg/1280px-Glazed-Donut.jpg');
            message.reply(errorEmbed);
            return;
    }
    name = name.trim();
    console.log("comparing : " + (args.length + argv) + " and " + ( 2 + argv));
    if (args[args.length - 1] != 'solo' && args[args.length - 1] != 'flex') {
        const errorEmbed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Gimmie a Queue!')
                .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                .setDescription("You forgot to specify what queue you want stats for!")
                .setThumbnail('https://cdn2.iconfinder.com/data/icons/picons-basic-2/57/basic2-189_bug-512.png')
                .setTimestamp()
                .setFooter('this fuckin guy', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Glazed-Donut.jpg/1280px-Glazed-Donut.jpg');
            message.reply(errorEmbed);
            return;
    }
    const response = message.channel;
    
    const sumData = await getSummonerMetrics(name);
    var summonerName = sumData.name;
    var summonerLevel = sumData.summonerLevel;
    var summonerIcon = sumData.profileIconId;
    //const champData = await getMasteryData(sumData.id);
    const rankedData = await getRankedData(sumData.id);
    var rank;
    var wins;
    var losses;
    var total;
    var winrate;
    console.log(rankedData);
    if (rankedData.length === 0) {
        const norankEmbed = new Discord.MessageEmbed()
            .setColor('#C6AD64')
            .setTitle('League of Legends Solo/Duo Stats')
            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
            .addField('Summoner Name: ', summonerName, false)
            .addField('Summoner Level: ', summonerLevel, false)
            .addField('Rank: ', '**Unranked**', false)
            .addField('Total Ranked Games Played: ', '**None**', false)
            .setThumbnail('http://ddragon.leagueoflegends.com/cdn/10.23.1/img/profileicon/' + icons[summonerIcon])
            .setTimestamp()
            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
        message.reply(norankEmbed);
        return;
    }
    for (const key in rankedData) {
        if (rankedData[key].queueType == solo) {
            rank = rankedData[key].rank + ' ' + rankedData[key].tier;
            wins = rankedData[key].wins;
            losses = rankedData[key].losses;
            total = wins + losses;
            winrate = Math.round((wins / total) * 100, 2);
            const lolSoloEmbed = new Discord.MessageEmbed()
                .setColor('#C6AD64')
                .setTitle('League of Legends Solo/Duo Stats')
                .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                .addField('Summoner Name: ', summonerName, false)
                .addField('Summoner Level: ', summonerLevel, false)
                .addField('Rank: ', rank, false)
                .addField('Total Ranked Games Played: ', total, false)
                .addField('Wins: ', wins, false)
                .addField('Losses: ', losses, false)
                .addField('Winrate: ', winrate + '%', false)
                .setThumbnail('http://ddragon.leagueoflegends.com/cdn/10.23.1/img/profileicon/' + icons[summonerIcon])
                .setTimestamp()
                .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
            if (args[args.length - 1] === 'solo') {
                message.reply(lolSoloEmbed);
                return;
            }
        }
        if (rankedData[key].queueType == flex) {
            rank = rankedData[key].rank + ' ' + rankedData[key].tier;
            wins = rankedData[key].wins;
            losses = rankedData[key].losses;
            total = wins + losses;
            winrate = Math.round((wins / total) * 100, 2);
            const lolFlexEmbed = new Discord.MessageEmbed()
                .setColor('#C6AD64')
                .setTitle('League of Legends Flex Stats')
                .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                .addField('Summoner Name: ', summonerName, false)
                .addField('Summoner Level: ', summonerLevel, false)
                .addField('Rank: ', rank, false)
                .addField('Total Ranked Games Played: ', total, false)
                .addField('Wins: ', wins, false)
                .addField('Losses: ', losses, false)
                .addField('Winrate: ', winrate + '%', false)
                .setThumbnail('http://ddragon.leagueoflegends.com/cdn/10.23.1/img/profileicon/' + icons[summonerIcon])
                .setTimestamp()
                .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
            if (args[args.length - 1] === 'flex') {
                message.reply(lolFlexEmbed);
                return;
            }
        }
    }
    
}

module.exports = {
    name: 'lol',
    cooldown: 3,
    description: 'Fetches league data',
    execute(message, args){
        console.log("init lol");
        main(message, args).then();
    }
}