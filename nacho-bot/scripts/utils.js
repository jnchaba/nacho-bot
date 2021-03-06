const fs = require('fs');

async function getMessagesBulk(channel, limit = 500) {
    const sum_messages = [];
    let last_id;

    while (true) {
        const options = { limit: limit > 100 ? 100 : limit };
        if (last_id) {
            options.before = last_id;
        }

        const messages = await channel.messages.fetch(options);
        sum_messages.push(...messages.array());
        last_id = messages.last().id;

        limit -= 100;
        if (messages.size != 100 || sum_messages >= limit || limit < 1) {
            break;
        }
    }

    return sum_messages;
}

//TODO: get list of admin roles and check if user has them
function checkUserAdmin(message) {
    const adminroles = ['Mod', 'Papa Bear', 'Nacho-Bot Team'];
    let isvalid = false;

    message.guild.members.cache.forEach(member => {
        if (member.user.id === message.author.id) {
            member.roles.cache.forEach(role => {
                if (adminroles.includes(role.name)) {
                    isvalid = true;
                }
            })
        }
    });
    return isvalid;
}

function getFileUpdatedDate(path) {
    const status = fs.statSync(path);
    return status.mtime.toLocaleString();
}


module.exports.getMessagesBulk = getMessagesBulk;
module.exports.checkUserAdmin = checkUserAdmin;
module.exports.getFileUpdatedDate = getFileUpdatedDate;