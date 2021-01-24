async function getMessagesBulk(channel, limit = 500) {
    const sum_messages = [];
    let last_id;

    while (true) {
        console.log("iterating");
        const options = { limit: limit > 100 ? 100 : limit };
        if (last_id) {
            options.before = last_id;
        }

        const messages = await channel.messages.fetch(options);
        console.log(messages.size);
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
function checkUserAdmin(user) {
    return true;
}

module.exports.getMessagesBulk = getMessagesBulk;
module.exports.checkUserAdmin = checkUserAdmin;