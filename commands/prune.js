const { MessageEmbed } = require('discord.js');
const utils = require('../scripts/utils');
const { errorUtil } = require('../scripts/errorUtil');


module.exports = {
    name: 'prune',
    description: 'delete old stuff',
    execute(message, args) {
        //check user has admin privs
        if (!utils.checkUserAdmin(message)) {
            //Display a message saying they don't have rights
            errorUtil.unauthorizedError(message);
            return;
        }

        //If they didn't pass an arg, or its less than 1 day, skip
        if (args[0] == undefined || parseInt(args[0]) < 1) {
            const errorEmbed = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Nah')
                .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                .setDescription("I'm not going to delete anything less than a day old, try again.")
                .setTimestamp()
            message.reply(errorEmbed);
            return;
        }

        const daysOld = Date.now() - parseInt(args[0] * (24 * 60 * 60 * 1000));

        //collect all messages
        utils.getMessagesBulk(message.channel, 2000).then(messages => {
            let total_msgs = 0;
            let filtered_msgs = 0;
            //check each message if date is outside of range
            messages.forEach(message => {
                total_msgs++;
                if (message.createdTimestamp < daysOld) {
                    filtered_msgs++;
                    message.delete();
                }
            })

            //Send a notification saying how many messages were deleted
            const pruneEmbed = new MessageEmbed()
                .setColor('#ff9933')
                .setTitle('Trimming the fat')
                .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                .setDescription(`Pruning will take some time to run. There were ${total_msgs} messages; ${filtered_msgs} will be deleted.`);
            pruneEmbed.setTimestamp();
            pruneEmbed.setFooter('Command currently being developed', 'https://cdn.discordapp.com/emojis/713166932538556499.png?v=');
            message.reply(pruneEmbed);
        });
    }

}

