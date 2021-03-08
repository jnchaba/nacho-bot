const stackExchange = require('stack-exchange')({ version : 2.2 });
const { soKey, soAccess } = require('../config.json');
const { errorUtil } = require('../scripts/errorUtil');
const { MessageEmbed } = require('discord.js');

async function main(message, args) {
    if (args.length == 0) {
        errorUtil.error(message, {
            description: "Please enter search term",
            noThumbnail: true
        });
        return;
    }

    const search = stackExchange.search;
    let search_options = {
        "tagged": "nodejs",
        "key": "2rVSlekyctEpNUt0T4uHLA((",
        "access_token": soAccess
    }

    search.search(search_options, (response) => {
        console.log(response);
    })
}

module.exports = {
    name: "so",
    description: "stack overflow search tool",
    execute(message, args) {
        console.log('init so');
        main(message, args);
    }
}