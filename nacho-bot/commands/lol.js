const TeemoJS = require('teemojs');
const request = require('request');
const Discord = require('discord.js');
const { prefix, token, rgapi } = require('../config.json');
const { lolApiUtil } = require('../scripts/lolApiUtil.js');
const { errorUtil } = require('../scripts/errorUtil');
const { riotAccountUtil } = require('../scripts/riotAccountUtil');

let api = TeemoJS(rgapi);

const matchIds = [];
const champIds = [];
const solo = 'RANKED_SOLO_5x5';
const flex = 'RANKED_FLEX_SR';

async function main(message, args) {
    var argv = 0;
    var name = '';
    for (let i = 0; i < args.length - 1; i++) {
        name += args[i];
        if (i < args.length - 1) {
            name += " ";
        }
    }
    if (args.length == 0) {
        errorUtil.error(message, {
            title: "Gimmie a Name!",
            description: "You forgot to give me a summoner name!",
        });
        return;
    }
    name = name.trim();
    if (args[args.length - 1] != 'solo' && args[args.length - 1] != 'flex') {
        errorUtil.error(message, {
            title: "Gimmie a Queue!",
            description: "You forgot to specify what queue you want stats for!",
        });
        return;
    }
    const response = message.channel;

    const sumData = await lolApiUtil.getSummonerMetrics(name);
    console.log(sumData);
    var summonerName = sumData.name;
    var summonerLevel = sumData.summonerLevel;
    var summonerIconString = riotAccountUtil.getSummonerIconURL(sumData);
    const rankedData = await lolApiUtil.getRankedData(sumData.id);
    var rank;
    var wins;
    var losses;
    var total;
    var winrate;
    if (rankedData.length === 0) {
        const norankEmbed = new Discord.MessageEmbed()
            .setColor('#C6AD64')
            .setTitle('League of Legends Solo/Duo Stats')
            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
            .addField('Summoner Name: ', summonerName, false)
            .addField('Summoner Level: ', summonerLevel, false)
            .addField('Rank: ', '**Unranked**', false)
            .addField('Total Ranked Games Played: ', '**None**', false)
            .setThumbnail(summonerIconString)
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
                .setThumbnail(summonerIconString)
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
                .setThumbnail(summonerIconString)
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
    execute(message, args) {
        console.log("init lol");
        main(message, args).then();
    }
}