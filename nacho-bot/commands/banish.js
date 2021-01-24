const { Guild, MessageEmbed } = require('discord.js');
const utils = require('../scripts/utils');

module.exports = {
    name: 'banish',
    description: 'banish a user to the shadow realm (or another voice channel)',
    execute(message, args) {
        //check user has admin privs
        if (!utils.checkUserAdmin(message)) {
            //Display a message saying they don't have rights
            const errorEmbed = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('And who tf are you?!')
                .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                .setDescription("you think just anybody can run this shit? Check your privilege snowflake")
                .setThumbnail('https://cdn2.iconfinder.com/data/icons/picons-basic-2/57/basic2-189_bug-512.png')
                .setImage('https://i.imgflip.com/19hgqh.jpg')
                .setTimestamp()
                .setFooter('this fuckin guy', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Glazed-Donut.jpg/1280px-Glazed-Donut.jpg');
            message.reply(errorEmbed);
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
            const errorEmbed = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Aw, shit...')
                .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                .setDescription("I couldn't find that user")
                .setTimestamp()
                .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
            message.reply(errorEmbed);
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
            const errorEmbed = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Aw, shit...')
                .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                .setDescription("I couldn't find that channel")
                .setTimestamp()
                .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
            message.reply(errorEmbed);
            return;
        }

        //set up an error message if the API rejects us
        process.on('unhandledRejection', function (err) {
            const errorEmbed = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Aw, shit...')
                .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                .setDescription("I don't think that user is connected to voice")
                .setTimestamp()
                .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
            message.reply(errorEmbed);
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

