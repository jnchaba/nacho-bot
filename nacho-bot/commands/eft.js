const { MessageAttachment } = require('discord.js');

module.exports = {
    name:'eft',
    description:'eft',
    execute(message, args) {
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