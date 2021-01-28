/*
Teamfight Tactics: summoner history, upcoming matches, using TeemoJS NPM Package
 */

//name, icon, level, rank, winrate

const { MessageEmbed } = require('discord.js');
const tftApi = require ('../scripts/tftApi.js');

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

    let summonerName = "";
    for (let i = 0; i < args.length; i++) {
        summonerName += args[i];
        if (i < args.length - 1) {
            summonerName += " ";
        }
    }
    
    const summoner = await tftApi.getSummonerData(summonerName);

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

module.exports = {
    name: 'tft',
    description: 'tft utils',
    execute(message, args) {
        console.log('init tft');
        main(message, args).then();
    }

}
