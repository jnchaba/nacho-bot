const { MessageAttachment } = require('discord.js');

module.exports = {
    name:'bonk',
    description:'bonk',
    execute(message, args) {
        message.channel.send(new MessageAttachment("./images/bonk.gif"));
    }
}