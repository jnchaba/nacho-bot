const util = require('minecraft-server-util');
const Discord = require('discord.js');
const { hal69420 } = require('../servers.json');
const { errorUtil } = require('../scripts/errorUtil');

const server = {
    ip: `${hal69420}`,
    port: 25565
};

const text = {
    error: 'Error getting Minecraft server status:', // Check your terminal when you see this
    online: '**Minecraft** server is **online**',
    players: '**{online}** people are playing!', // {online} will show player count
    noPlayers: 'Nobody is playing'
};


module.exports = {
    name: 'minecraft',
    description: 'minecraft',
    execute(message, args) {
        util.status(server.ip, { port: server.port })
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
                        { name: 'IP Address:', value: `${hal69420}`, inline: true },
                        { name: 'Players Online:', value: `${players}` }
                    )
                    .setImage('https://media.giphy.com/media/cuHjncTuHW40g/giphy.gif')
                    .setTimestamp()
                    .setFooter('New RAM is in! Server should be running much better!', 'https://cdn.discordapp.com/emojis/713166932538556499.png?v=');

                message.channel.send(mcstatusEmbed);
            })
            .catch(err => {
                if (err === "undefined") {
                    err = "Server is Offline";
                }
                console.error(err);
                errorUtil.error(message, {
                    description: text.error,
                    fields: [{ name: 'Error Message', value: `${err}` }],

                });
            })
    }
}