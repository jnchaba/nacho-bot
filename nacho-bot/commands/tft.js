/*
Teamfight Tactics: summoner history, upcoming matches, using TeemoJS NPM Package
 */

//name, icon, level, rank, winrate

const { MessageEmbed } = require('discord.js');
const TeemoJS = require('teemojs');
const request = require('request');
const { prefix, token, mikesRiotAPIKey } = require('../config.json');
const { match } = require('assert');
let teemo = TeemoJS(mikesRiotAPIKey);

async function main(message, args) {
    if (args.length == 0) {
        const errorEmbed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Aw, shit...')
            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
            .setDescription("Please enter a username")
            .setTimestamp()
            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
        message.reply(errorEmbed);
        return;
    }
    const summonerName = args[0];
    
    const summoner = await getSummonerData(summonerName);

    if (summoner === undefined) {
        const errorEmbed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Aw, shit...')
            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
            .setDescription("I couldn't find that summoner.")
            .setTimestamp()
            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
        message.reply(errorEmbed);
        return;
    }

    const summonerDataEmbed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('TFT Stats')
        .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
        .setTimestamp()
        .setFooter('Command currently being developed', 'https://cdn.discordapp.com/emojis/713166932538556499.png?v=');

    summonerDataEmbed.addField("Summoner Name", summoner.name);
    summonerDataEmbed.addField("Summoner Icon", summoner.icon);
    summonerDataEmbed.addField("Level", summoner.level);
    summonerDataEmbed.addField("Rank", summoner.rank);
    summonerDataEmbed.addField("Winrate", summoner.winrate);
    message.reply(summonerDataEmbed);
}

async function getSummonerData(summonerName) {
    let output = {};

    const summoner = await getSummonerByName(summonerName);
    if (summoner === null) {
        return undefined;
    }
    const entries = await getLeagueEntries(summoner.id);//UtcMpsT00sv70OmKiRsdZY9mJTBOF7tjhvczP9zIzoHw80w
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

async function getSummonerByName(summonerName) {
    return await teemo.get('na1', 'tftSummoner.getBySummonerName', summonerName);
}

async function getLeagueEntries(summonerId) {
    return await teemo.get('na1', 'tftLeague.getLeagueEntriesForSummoner', summonerId);
}

module.exports = {
    name: 'tft',
    description: 'tft utils',
    execute(message, args) {
        console.log('init tft');
        main(message, args).then();
    }

}
