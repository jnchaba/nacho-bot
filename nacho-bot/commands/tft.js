/*
Teamfight Tactics: summoner history, upcoming matches, using TeemoJS NPM Package
 */

//name, icon, level, rank, winrate

const { MessageEmbed } = require('discord.js');
const { tftApiUtil } = require ('../scripts/tftApiUtil.js');
const { riotAccountUtil } = require('../scripts/riotAccountUtil.js');

async function getSummonerData(summonerName) {
    let output = {};
    
    const summoner = await tftApiUtil.getSummonerByName(summonerName);
    if (summoner === null) {
        return undefined;
    }
    const entries = await tftApiUtil.getLeagueEntries(summoner.id);
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

async function main(message, args) {
    if (args.length == 0) {
        errorUtil.error(message, {
            description: "Please enter a username",
            noThumbnail: true
        });
        return;
    }

    let summonerName = "";
    for (let i = 0; i < args.length; i++) {
        summonerName += args[i];
        if (i < args.length - 1) {
            summonerName += " ";
        }
    }
    
    const summoner = await getSummonerData(summonerName);

    if (summoner === undefined) {
        errorUtil.error(message, {
            description: "I couldn't find that summoner.",
            noThumbnail: true
        });
        return;
    }

    const summonerDataEmbed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('TFT Stats')
        .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
        .setThumbnail(riotAccountUtil.getSummonerIconURL(summoner))
        .setTimestamp()
        .setFooter('Command currently being developed', 'https://cdn.discordapp.com/emojis/713166932538556499.png?v=');
    
    summonerDataEmbed.addField("Summoner Name", summoner.name);
    summonerDataEmbed.addField("Level", summoner.level);
    summonerDataEmbed.addField("Rank", summoner.rank);
    summonerDataEmbed.addField("Winrate", summoner.winrate);
    message.reply(summonerDataEmbed);
}

module.exports = {
    name: 'tft',
    description: 'tft utils',
    execute(message, args) {
        console.log('init tft');
        main(message, args).then();
    }

}
