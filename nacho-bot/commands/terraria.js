const Discord = require('discord.js');

const terrariaEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Terraria Server')
    .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
    .setDescription('nacho-bot hosts a terraria server!')
    .setThumbnail('https://www.decoygaming.com.au/wp-content/uploads/2013/10/terraria_icon.png')
    .addFields( 
        { name: 'IP Address:', value: '136.56.29.213', inline: true },
        { name: 'Password', value: 'nachobot', inline: true }
    )
    .setImage('https://gamepedia.cursecdn.com/terraria_gamepedia/3/36/Sandstorm_in_a_bottle_animation.gif')
    .setTimestamp()
    .setFooter('Please be patient with the small world until nacho-bot downloads more ram :sadkitty:');

module.exports = {
    name:'terraria',
    description:'terraria',
    execute(message, args) {
    message.channel.send(helpEmbed);
    }
};