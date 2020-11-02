const Discord = require('discord.js');
const { hal69420 } = require('../servers.json');
module.exports = {
    name: 'minecraft',
    description: 'minecraft',
    execute(message, args) {
        const minecraftEmbed = new Discord.MessageEmbed()
          .setColor('#ff9933')
          .setTitle('Minecraft Server')
          .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
          .setDescription('nacho-bot hosts a minecraft server!')
          .setThumbnail('https://biebs.files.wordpress.com/2013/02/minecraft_icon.png')
          .addFields(
            { name: 'IP Address:', value: `${hal69420}`, inline: true }
          )
          .setImage('https://media.giphy.com/media/cuHjncTuHW40g/giphy.gif')
          .setTimestamp()
          .setFooter('Please be patient, server may be choppy until replacement ram comes in', 'https://cdn.discordapp.com/emojis/713166932538556499.png?v=');

        message.channel.send(minecraftEmbed);
    }
};