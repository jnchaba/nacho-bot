const { MessageAttachment } = require('discord.js');
const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name:'eft',
    description:'eft',
    execute(message, args) {
        if (args[0] === "scrape") {
            var data = fs.readFileSync('./marketdata.json', 'utf-8');
            var words = JSON.parse(data);
            var count = Object.keys(words).length;
            const scrapeEmbed = new Discord.MessageEmbed()
                .setColor('#ff9933')
                .setTitle('EFT Tarkov-Data Scrape Results')
                .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                .setDescription("Number of items scraped: " + count);
            for (let index = 0; index < count; index++) {
                    scrapeEmbed.addField('Item:', words[index].name, true);
                    scrapeEmbed.addField('Avg Price:', words[index].avg, true);
                }
            scrapeEmbed.setTimestamp();
            scrapeEmbed.setFooter('Command currently being developed', 'https://cdn.discordapp.com/emojis/713166932538556499.png?v=');
            message.channel.send(scrapeEmbed);
        }
        if (args[0] === "customs") {
            message.channel.send(new MessageAttachment("./images/customs_map.png"));
        }
        else if (args[0] === "interchange") {
            message.channel.send(new MessageAttachment("./images/interchange_map.png"));
        }
        else if (args[0] === "shoreline") {
            message.channel.send(new MessageAttachment("./images/shoreline_map.png"));
        }
        else if (args[0] === "factory") {
            message.channel.send(new MessageAttachment("./images/factory_map.jpg"));
        }
        else if (args[0] === "reserve") {
            message.channel.send(new MessageAttachment("./images/reserve_map.png"));
        }
        else if (args[0] === "woods") {
            message.channel.send(new MessageAttachment("./images/woods_map.png"));
        }
        else if (args[0] === "labs") {
            message.channel.send(new MessageAttachment("./images/labs_map.png"));
        }
        else if (args[0] == "hideout") {
            message.channel.send(new MessageAttachment("./images/hideout.png"));
        }
        else if (args[0] == "quest") {
            message.channel.send(new MessageAttachment("./images/quest.png"));
        }
    }
}