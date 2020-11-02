const Discord = require('discord.js');

const minecraftEmbed = new Discord.MessageEmbed()
  .setColor('#ff9933')
  .setTitle('Minecraft Server')
  .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
  .setDescription('nacho-bot hosts a minecraft server!')
  .setThumbnail('https://biebs.files.wordpress.com/2013/02/minecraft_icon.png')
  .addFields( 
      { name: 'IP Address:', value: '136.56.29.213', inline: true }
  )
  .setImage('https://media.giphy.com/media/cuHjncTuHW40g/giphy.gif')
  .setTimestamp()
  .setFooter('Please be patient with the small world until nacho-bot downloads more ram :sadkitty:');


module.exports = {
    name:'minecraft',
    description:'minecraft',
    execute(message, args) {
      message.channel.send(minecraftEmbed);
    }
};