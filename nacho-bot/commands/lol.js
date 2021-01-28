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
    var argv = 0;
    var name = '';
    for (let i = 0; i < args.length - 1; i++) {
        name += args[i];
        if (i < args.length - 1) {
            name += " ";
        }
    }
    if (args.length == 0 ) {
        const errorEmbed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Gimmie a Name!')
                .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                .setDescription("You forgot to give me a summoner name!")
                .setThumbnail('https://cdn2.iconfinder.com/data/icons/picons-basic-2/57/basic2-189_bug-512.png')
                .setTimestamp()
                .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
            message.reply(errorEmbed);
            return;
    }
    name = name.trim();
    if (args[args.length - 1] != 'solo' && args[args.length - 1] != 'flex') {
        const errorEmbed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Gimmie a Queue!')
                .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                .setDescription("You forgot to specify what queue you want stats for!")
                .setThumbnail('https://cdn2.iconfinder.com/data/icons/picons-basic-2/57/basic2-189_bug-512.png')
                .setTimestamp()
                .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
            message.reply(errorEmbed);
            return;
    }
    const response = message.channel;
    
    const sumData = await lolApiUtil.getSummonerMetrics(name);
    var summonerName = sumData.name;
    var summonerLevel = sumData.summonerLevel;
    var summonerIcon = sumData.profileIconId;
    //const champData = await getMasteryData(sumData.id);
    const rankedData = await lolApiUtil.getRankedData(sumData.id);
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
            rank = rankedData[key].tier + ' ' + rankedData[key].rank;
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
            rank = rankedData[key].tier + ' ' + rankedData[key].rank;
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