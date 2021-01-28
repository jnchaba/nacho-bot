const { MessageEmbed } = require('discord.js');


/* @param message: object -> the discord.js message object that 
 *                          was passed to the execute function
 * @param errobj: object -> a js object that contains the following properties
 *  -title: string (optional)
 *  -description: string (optional)
 *  -fields: [object] -> an array of field objects to attach to the message
 *  -thumbnail: string (Optional) -> url to thumbnail image
 *  -noThumbnail: boolean (Optional) -> override to not use a thumbnail
 */


const defaultThumbnail = 'https://cdn2.iconfinder.com/data/icons/picons-basic-2/57/basic2-189_bug-512.png';
const defaultTitle = 'Aw, shit...';
const defaultDescription = "An error occured, but I didn't write a good message.";

function error(message, errobj) {
    const errorEmbed = new MessageEmbed()
        .setColor('#ff0000')
        .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
        .setTimestamp()
        .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png');
    
    if (errobj.title) {
        errorEmbed.setTitle(errobj.title);
    } else {
        errorEmbed.setTitle(defaultTitle);
    }

    if (errobj.description) {
        errorEmbed.setTitle(errobj.description);
    } else {
        errorEmbed.setTitle(defaultDescription);
    }

    if (errobj.thumbnail !== undefined) {
        errorEmbed.setThumbnail(errobj.thumbnail);
    } else if (!errobj.noThumbnail) {
        errorEmbed.setThumbnail(defaultThumbnail);
    }

    if (errobj.fields !== undefined) {
        errobj.fields.forEach(field => {
            errorEmbed.setField(field);
        });
    }

    message.reply(errorEmbed);
}

function unauthorizedError(message) {
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
}

const errorUtil = {
    error: error,
    unauthorizedError: unauthorizedError
}

module.exports.errorUtil = errorUtil;