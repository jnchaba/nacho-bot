const { MessageEmbed } = require('discord.js');
const utils = require('../scripts/utils');
const { errorUtil } = require('../scripts/errorUtil');

module.exports = {
    name: 'banish',
    description: 'banish a user to the shadow realm (or another voice channel)',
    execute(message, args) {
        //check user has admin privs
        if (!utils.checkUserAdmin(message)) {
            //Display a message saying they don't have rights
            errorUtil.unauthorizedError(message);
            return;
        }


        let userid = "";
        let channelname = "";
        let targetUser = undefined;
        let targetChannel = undefined;

        if (args[0] !== undefined) {
            userid = args[0].replace("<@!","").replace(">","");
        }

        for (let i = 1; i < args.length; i++) {
            channelname += args[i];
            if (i < args.length - 1) {
                channelname += " ";
            }
        }

        //get the user object based on the username arg
        message.client.guilds.cache.forEach(guild => {
            guild.members.cache.forEach(member => {
                if (member.user.id === userid) {
                    targetUser = member;
                }
            });
        });

        if (targetUser === undefined) {
            errorUtil.error(message, {
                description: "I couldn't find that user",
                noThumbnail: true
            });
            return;
        }

        //get the channel object based on the channel arg
        message.client.channels.cache.forEach(channel => {
            if (channel.type === "voice") {
                if (channel.name.toLowerCase() === channelname.toLowerCase()) {
                    targetChannel = channel;
                }
            }
        })

        if (targetChannel === undefined) {
            errorUtil.error(message, {
                description: "I couldn't find that channel",
                noThumbnail: true
            });
            return;
        }

        //set up an error message if the API rejects us
        process.on('unhandledRejection', function (err) {
            errorUtil.error(message, {
                description: "I don't think that user is connected to voice",
                noThumbnail: true
            });
            return;
        });

        //try to set the channel and display a success message
        targetUser.voice.setChannel(targetChannel).then(o => {
            const banishEmbed = new MessageEmbed()
                .setColor('#ff9933')
                .setTitle('GTFO')
                .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                .setDescription(`${targetUser.user.username} has been banished to ${targetChannel.name}`)
                .setImage("https://memegenerator.net/img/instances/81439936/youve-activated-my-trap-card-and-i-banish-you-to-the-shadow-realm.jpg");
            banishEmbed.setTimestamp();
            banishEmbed.setFooter('Command currently being developed', 'https://cdn.discordapp.com/emojis/713166932538556499.png?v=');
            message.reply(banishEmbed);

        });

        return;
    }
}

