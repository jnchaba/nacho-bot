const fs = require('fs');
var scrape = require('./scripts/scrape.js');
const { prefix, token } = require('./config.json');

const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    scrape.scrape();
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
        const errorEmbed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Aw... shit')
            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
            .setDescription(error)
            .setThumbnail('https://cdn2.iconfinder.com/data/icons/picons-basic-2/57/basic2-189_bug-512.png')
            .setImage('https://i.redd.it/jmo62jjnjg251.png')
            .setTimestamp()
            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
        console.error(error);
        message.reply(errorEmbed);
    }
});

client.login(token);