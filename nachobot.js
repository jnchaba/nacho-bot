//test
const fs = require('fs');
var scrape = require('./scripts/scrape.js');
const { prefix, token, rgapi } = require('./config.json');

const Discord = require('discord.js');
const { timeStamp } = require('console');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const { errorUtil } = require('./scripts/errorUtil');

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('!nachohelp', {type: "WATCHING" });
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.toLowerCase().slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        
        errorUtil.error(message, {
            description: error,
        });
    }
});

// let now = new Date();
// let day;
// let logged = false;

// var interval = setInterval(function(){
//     now = new Date();
//     if (day != now.getDay()) {
//         scrape.scrape();
//         day = now.getDay();
//         logged = false;
//     } else {
//         if (!logged) {
//             //console.log('Already Scraped Today!');
//             logged = true;
//         }
//     }
// }, 10000);

client.login(token);