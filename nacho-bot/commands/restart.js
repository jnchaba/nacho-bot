const { MessageEmbed } = require('discord.js');
const utils = require('../scripts/utils');
const { errorUtil } = require('../scripts/errorUtil');

async function main(message, args) {
    //check user has admin privs
    if (utils.checkSuperUser(message)) {
        const restartEmbed = new MessageEmbed()
            .setColor('#ff9933')
            .setTitle('Caution')
            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
            .setDescription(`This operation will restart nacho-bot on **all active servers**.\nPlease confirm this by reacting with :white_check_mark:`)
        restartEmbed.setTimestamp();
        restartEmbed.setFooter('Called by ' + message.author.username, message.author.avatarURL());
        const reactionMessage = await message.reply(restartEmbed);
        const Filter = (reaction, user) => user.id == message.author.id;
        reactionMessage.awaitReactions(Filter, {max: 1, time: 30000, errors: ["time"]}).then(collected => {
            const reaction = collected.first();
            console.log()
            switch(reaction.emoji.name) {
                case '✅':

                    break;
                case '❌':

                    break;
            }
        })

    } else {
        errorUtil.error(message, {
            description: "You do not have permission to run this command.",
            noThumbnail: true
        });
    }
}

module.exports = {
    name: 'restart',
    description: 'restarts nacho-bot!',
    execute(message, args) {
        console.log('ran restart.js')
        main(message, args);
    }
}

