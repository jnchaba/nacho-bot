const { MessageAttachment } = require('discord.js');

module.exports = {
    name:'yakub',
    description:'yakub',
    execute(message, args) {
        message.channel.send(new MessageAttachment("./images/yakoob.jpg"));
    }
}