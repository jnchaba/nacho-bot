const Discord = require('discord.js');
const { hal69420, terrariapass } = require('../servers.json');
module.exports = {
    name: 'terraria',
    description: 'terraria',
    execute(message, args) {
        const terrariaEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Terraria Server')
            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
            .setDescription('nacho-bot hosts a terraria server!')
            .setThumbnail('https://www.decoygaming.com.au/wp-content/uploads/2013/10/terraria_icon.png')
            .addFields(
                { name: 'IP Address:', value: `${hal69420}`, inline: true },
                { name: 'Password', value: `${terrariapass}`, inline: true }
            )
            .setImage('https://gamepedia.cursecdn.com/terraria_gamepedia/3/36/Sandstorm_in_a_bottle_animation.gif')
            .setTimestamp()
            .setFooter('New RAM is in! Server should be running much better!', 'https://cdn.discordapp.com/emojis/713166932538556499.png?v=1');

        message.channel.send(terrariaEmbed);
    }
};