const util = require('minecraft-server-util');
const Discord = require('discord.js');
const { hal69420 } = require('../servers.json');

const server = {
    ip: `${ hal69420 }`,
    port: 25565
};

const text = {
            error: 'Error getting Minecraft server status...', // Check your terminal when you see this
            online: '**Minecraft** server is **online**',
            players: '**{online}** people are playing!', // {online} will show player count
            noPlayers: 'Nobody is playing'
};


module.exports = {
    name: 'mcstatus',
    description: 'mcstatus',
    execute(message, args) {
        util.status(server.ip, {port: server.port })
        .then(res => {
            data = res;
            lastUpdated = Date.now();
            let players = data.onlinePlayers ? text.players : text.noPlayers;
            players = players.replace('{online}', data.onlinePlayers);
            const mcstatusEmbed = new Discord.MessageEmbed()
            .setColor('#ff9933')
            .setTitle('Minecraft Server Status')
            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
            .setDescription(text.online)
            .setThumbnail('https://biebs.files.wordpress.com/2013/02/minecraft_icon.png')
            .addFields(
            //{ name: 'IP Address:', value: `${hal69420}`, inline: true }
            {name: 'Players Online:', value: `${players}`}
            )
            .setImage('https://media.giphy.com/media/cuHjncTuHW40g/giphy.gif')
            .setTimestamp()
            .setFooter('Please be patient, server may be choppy until replacement ram comes in', 'https://cdn.discordapp.com/emojis/713166932538556499.png?v=');

            message.channel.send(mcstatusEmbed);
        })
        .catch( err => {
            const mcstatusErrorEmbed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Aw... shit')
            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
            .setDescription(text.error)
            .addFields(
                {name: 'Error Message', value: `${err}`}
                )
            .setThumbnail('https://cdn2.iconfinder.com/data/icons/picons-basic-2/57/basic2-189_bug-512.png')
            .setImage('https://i.redd.it/jmo62jjnjg251.png')
            .setTimestamp()
            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
            message.reply(mcstatusErrorEmbed);
            console.error(err);
        })
    }
}