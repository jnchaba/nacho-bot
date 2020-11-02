const fs = require('fs');
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
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
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

var i = 1;

var interval = setInterval (function (){
    if (i === 1) {
        client.guilds.cache.get("163008258645295104").channels.cache.get("769789622204629022").send("Searching for pokemon in tall grass...");
        i = 2;
    } else if (i === 2) {
        client.guilds.cache.get("163008258645295104").channels.cache.get("769789622204629022").send("Pulling Brock away from female trainers...");
        i = 3;
    } else if (i === 3) {
        client.guilds.cache.get("163008258645295104").channels.cache.get("769789622204629022").send("Blasting Team Rocket into Space...");
        i = 4;
    } else if (i === 4) {
        client.guilds.cache.get("163008258645295104").channels.cache.get("769789622204629022").send("Petting Pikachu...");
        i = 5;
    } else if (i === 5) {
        client.guilds.cache.get("163008258645295104").channels.cache.get("769789622204629022").send("Fighting the Elite Four...");
        i = 1;
    }
    
}, 120000);

client.login(token);