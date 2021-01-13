const Discord = require('discord.js');

const helpEmbed = new Discord.MessageEmbed()
    .setColor('#009900')
    .setTitle('Help')
    .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
    .setDescription('Here are my commands, pal!')
    .setThumbnail('https://i.kym-cdn.com/entries/icons/facebook/000/021/464/14608107_1180665285312703_1558693314_n.jpg')
    .addFields(
        { name: '!nachohelp', value: 'This command got you here', inline: true },
        { name: '!home', value: 'Tells you where nacho-bot lives', inline: true },
        { name: '!bonk', value: 'Doggo bonks you', inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: '!minecraft', value: 'Info about minecraft server', inline: true },
        { name: '!terraria', value: 'Info about terraria server', inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: '!daddy', value: 'Info about this bot\'s daddy', inline: true },
        { name: '!mommy', value: 'Info about this bot\'s mommy', inline: true },
        { name: '!son', value: 'Info about this bot\'s son', inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: '!eft [map name]', value: 'Displays selected EFT Map', inline: true },
        { name: '!wow [class] [spec]', value: 'Displays information for specified WoW class spec', inline: true },
        { name: '!wow help', value: 'Additional help for wow commands', inline: true }
    )
    .setTimestamp()
    .setFooter('More commands coming soon!');

module.exports = {
    name:'nachohelp',
    description:'nachohelp',
    execute(message, args) {
        message.channel.send(helpEmbed);
    }
}