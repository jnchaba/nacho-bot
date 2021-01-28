const { MessageAttachment } = require('discord.js');
const Discord = require('discord.js');
const fs = require('fs');
const utils = require('../scripts/utils');
const { errorUtil } = require('../scripts/errorUtil');

module.exports = {
    name:'eft',
    description:'eft',
    execute(message, args) {
        const response = message.channel;
        var responded = false;

        process.on('uncaughtException', function (err) {
            console.error(err);
            errorUtil.error(message, {
                description: err,
            });
            return;
        });

        if (args.length == 0) {
            errorUtil.error(message, {
                title: "Missing arguments",
                description: "format: !eft scrape or !eft mapname or !eft hideout/quest",
            });
            return;
        }

        switch(args[0]) {
            case "scrape":
                var data = fs.readFileSync('./marketdata.json', 'utf-8');
                var mdate = utils.getFileUpdatedDate('./marketdata.json');
                var words = JSON.parse(data);
                var count = Object.keys(words).length;
                const scrapeEmbed = new Discord.MessageEmbed()
                .setColor('#ff9933')
                .setTitle('EFT Tarkov-Market Scrape Results')
                .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                .setDescription("Top **" + count + "** items on https://tarkov-market.com/ :");
                for (let index = 0; index < count; index++) {
                    var name = words[index].name.substr(0, words[index].name.length - 6);
                    var price = words[index].avg;
                    if (price.length < 5) {
                        price = '\n' + price;
                    }
                    scrapeEmbed.addField(name, price, true);
                }
                scrapeEmbed.setTimestamp();
                scrapeEmbed.setFooter('Data scraped on: ' + mdate, 'https://cdn.discordapp.com/emojis/713166932538556499.png?v=');
                response.send(scrapeEmbed);
                responded = true;
                break;
            case "hideout":
                response.send(new MessageAttachment("./images/hideout.png"));
                responded = true;
                break;
            case "quest":
                response.send(new MessageAttachment("./images/quest.png"));
                responded = true;
                break;
        }
        if (!responded) {
            response.send(new MessageAttachment("./images/" + args[0] + "_map.png"));
        } 
    }
}