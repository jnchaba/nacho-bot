const { MessageAttachment } = require('discord.js');
const Discord = require('discord.js');

// Function for generating responses for each class argument
function response(color, title, description, thumbnail) {
    var responseMessage = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(title)
        .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
        .setDescription(description)
        .setThumbnail(thumbnail)
        .setImage('https://static.icy-veins.com/images/common/logo.png')
        .setTimestamp()
        .setFooter('Want this command edited? DM NachoAveragePlayer', 'https://cdn.discordapp.com/avatars/194630142029594625/9e180c4a649e606caad60c4edaef23ee.png?size=256')
    return responseMessage;
}

module.exports = {
    name:'wow',
    description:'wow',
    execute(message, args) {
        if (args[0] === "help") {
            const helpEmbed = new Discord.MessageEmbed()
                            .setColor('#A5571F')
                            .setTitle('WoW Command Help')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("Usage:")
                            .setThumbnail('http://www.iamhermitthecrab.com/wp-content/uploads/2016/09/wow.png')
                            .addFields(
                                { name: 'Druid Specs', value: '!wow druid balance/feral/resto/guardian' },
                                { name: 'Death Knight Specs', value: '!wow dk unholy/frost/blood' },
                                { name: 'Demon Hunter Specs', value: '!wow dh havoc/vengeance' },
                                { name: 'Hunter Specs', value: '!wow hunter bm/marksmanship/survival' },
                                { name: 'Mage Specs', value: '!wow mage arcane/fire/frost' },
                                { name: 'Warlock Specs', value: '!wow lock afflication/destruction/demonology' },
                                { name: 'Monk Specs', value: '!wow monk brew/mist/wind' },
                                { name: 'Priest Specs', value: '!wow priest discipline/holy/shadow' },
                                { name: 'Paladin Specs', value: '!wow pally holy/retribution/protection' },
                                { name: 'Rogue Specs', value: '!wow rogue assassin/outlaw/subtlety' },
                                { name: 'Shaman Specs', value: '!wow shaman elemental/enhancement/restoration' },
                                { name: 'Warrior Specs', value: '!wow warrior arms/fury/protection' },
                                { name: 'Note', value: 'If you\'d like a command to be edited or shortened, dm <@194630142029594625>' }
                            )
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(helpEmbed);
        }
        else if (args.length < 2) {
            const errorEmbed = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Aw, shit...')
                    .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                    .setDescription("Please use format !wow [class] [spec]")
                    .setThumbnail('https://cdn2.iconfinder.com/data/icons/picons-basic-2/57/basic2-189_bug-512.png')
                    .setImage('https://i.redd.it/jmo62jjnjg251.png')
                    .setTimestamp()
                    .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                message.reply(errorEmbed);
        }
        switch(args[0]) {
            case "druid":
                switch(args[1]) {
                    case "balance":
                        const balanceEmbed = new response('#A5571F', 'Balance Druid', "https://www.icy-veins.com/wow/balance-druid-pve-dps-guide",
                                                            'https://media-hearth.cursecdn.com/attachments/0/149/druid_22.png');
                        message.reply(balanceEmbed);
                        break;
                    case "feral":
                        const feralEmbed = new response('#A5571F', 'Feral Druid', "https://www.icy-veins.com/wow/feral-druid-pve-dps-guide",
                                                            'https://media-hearth.cursecdn.com/attachments/0/149/druid_22.png');
                        message.reply(feralEmbed);
                        break;
                    case "resto":
                        const restoEmbed = new response('#A5571F', 'Resto Druid', "https://www.icy-veins.com/wow/restoration-druid-pve-healing-guide",
                                                            'https://media-hearth.cursecdn.com/attachments/0/149/druid_22.png');
                        message.reply(restoEmbed);
                        break;
                    case "guardian":
                        const guardianEmbed = new response('#A5571F', 'Guardian Druid', "https://www.icy-veins.com/wow/guardian-druid-pve-tank-guide",
                            'https://media-hearth.cursecdn.com/attachments/0/149/druid_22.png');
                        message.reply(guardianEmbed);
                        break;
                }
                break;
            case "dk":
                switch(args[1]) {
                    case "unholy":
                        const unholyEmbed = new response('#CE375F', 'Unholy Death Knight', "https://www.icy-veins.com/wow/unholy-death-knight-pve-dps-guide",
                            'https://media-hearth.cursecdn.com/attachments/0/148/deathknight_15.png');
                        message.reply(unholyEmbed);
                        break;
                    case "frost":
                        const frostEmbed = new response('#CE375F', 'Frost Death Knight', "https://www.icy-veins.com/wow/frost-death-knight-pve-dps-guide",
                            'https://media-hearth.cursecdn.com/attachments/0/148/deathknight_15.png');
                        message.reply(frostEmbed);
                        break;
                    case "blood":
                        const bloodEmbed = new response('#CE375F', 'Blood Death Knight', "https://www.icy-veins.com/wow/blood-death-knight-pve-tank-guide",
                            'https://media-hearth.cursecdn.com/attachments/0/148/deathknight_15.png');
                        message.reply(bloodEmbed);
                        break;
                }
                break;
            case "dh":
                switch(args[1]) {
                    case "havoc":
                        const havocEmbed = new response('#A330C9', 'Havoc Demon Hunter', "https://www.icy-veins.com/wow/havoc-demon-hunter-pve-dps-guide",
                            'http://media.blizzard.com/wow/legion-6a153ad2/images/metamorphosis-icon.png');
                        message.reply(havocEmbed);
                        break;
                    case "vengeance":
                        const vengeanceEmbed = new response('#A330C9', 'Vengeance Demon Hunter', "https://www.icy-veins.com/wow/vengeance-demon-hunter-pve-tank-guide",
                            'http://media.blizzard.com/wow/legion-6a153ad2/images/metamorphosis-icon.png');
                        message.reply(vengeanceEmbed);
                        break;
                }
                break;
            case "hunter":
                switch(args[1]) {
                    case "bm":
                        const bmEmbed = new response('#9BC075', 'Beast Mastery Hunter', "https://www.icy-veins.com/wow/beast-mastery-hunter-pve-dps-guide",
                            'https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Hunter-Guide.png');
                        message.reply(bmEmbed);
                        break;
                    case "marksmanship":
                        const marksEmbed = new response('#9BC075', 'Marksmanship Hunter', "https://www.icy-veins.com/wow/marksmanship-hunter-pve-dps-guide",
                            'https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Hunter-Guide.png');
                        message.reply(marksEmbed);
                        break;
                    case "survival":
                        const survEmbed = new response('#9BC075', 'Survival Hunter', "https://www.icy-veins.com/wow/survival-hunter-pve-dps-guide",
                            'https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Hunter-Guide.png');
                        message.reply(survEmbed);
                        break;
                }
                break;
            case "mage":
                switch(args[1]) {
                    case "arcane":
                        const arcaneEmbed = new response('#8BDEFB', 'Arcane Mage', "https://www.icy-veins.com/wow/arcane-mage-pve-dps-guide",
                            'https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Mage-Guide.png');
                        message.reply(arcaneEmbed);
                        break;
                    case "fire":
                        const fireEmbed = new response('#8BDEFB', 'Fire Mage', "https://www.icy-veins.com/wow/fire-mage-pve-dps-guide",
                            'https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Mage-Guide.png');
                        message.reply(fireEmbed);
                        break;
                    case "frost":
                        const frostmEmbed = new response('#8BDEFB', 'Frost Mage', "https://www.icy-veins.com/wow/frost-mage-pve-dps-guide",
                            'https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Mage-Guide.png');
                        message.reply(frostmEmbed);
                        break;
                }
                break;
            case "lock":
                switch(args[1]) {
                    case "affliction":
                        const affEmbed = new response('#9860B7', 'Affliction Warlock', "https://www.icy-veins.com/wow/affliction-warlock-pve-dps-guide",
                            'https://media-hearth.cursecdn.com/attachments/0/156/warlock_21.png');
                        message.reply(affEmbed);
                        break;
                    case "demonology":
                        const demonEmbed = new response('#9860B7', 'Demonology Warlock', "https://www.icy-veins.com/wow/demonology-warlock-pve-dps-guide",
                            'https://media-hearth.cursecdn.com/attachments/0/156/warlock_21.png');
                        message.reply(demonEmbed);
                        break;
                    case "destruction":
                        const destEmbed = new response('#9860B7', 'Destruction Warlock', "https://www.icy-veins.com/wow/destruction-warlock-pve-dps-guide",
                            'https://media-hearth.cursecdn.com/attachments/0/156/warlock_21.png');
                        message.reply(destEmbed);
                        break;
                }
                break;
            case "monk":
                switch(args[1]) {
                    case "brew":
                        const brewEmbed = new response('#37A587', 'Brewmaster Monk', "https://www.icy-veins.com/wow/brewmaster-monk-pve-tank-guide",
                            'https://odealo.com/uploads/public/World%20of%20Warcraft/Monk/Monk_image.png');
                        message.reply(brewEmbed);
                        break;
                    case "mist":
                        const mistEmbed = new response('#37A587', 'Mistweaver Monk', "https://www.icy-veins.com/wow/mistweaver-monk-pve-healing-guide",
                            'https://odealo.com/uploads/public/World%20of%20Warcraft/Monk/Monk_image.png');
                        message.reply(mistEmbed);
                        break;
                    case "wind":
                        const windEmbed = new response('#37A587', 'Windwalker Monk', "https://www.icy-veins.com/wow/windwalker-monk-pve-dps-guide",
                            'https://odealo.com/uploads/public/World%20of%20Warcraft/Monk/Monk_image.png');
                        message.reply(windEmbed);
                        break;
                }
                break;
            case "priest":
                switch(args[1]) {
                    case "discipline":
                        const disciplineEmbed = new response('#FFFFFD', 'Discipline Priest', "https://www.icy-veins.com/wow/discipline-priest-pve-healing-guide",
                            'https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Priest-Guide.png');
                        message.reply(disciplineEmbed);
                        break;
                    case "holy":
                        const holyEmbed = new response('#FFFFFD', 'Holy Priest', "https://www.icy-veins.com/wow/holy-priest-pve-healing-guide",
                            'https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Priest-Guide.png');
                        message.reply(holyEmbed);
                        break;
                    case "shadow":
                        const shadowEmbed = new response('#FFFFFD', 'Shadow Priest', "https://www.icy-veins.com/wow/shadow-priest-pve-dps-guide",
                            'https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Priest-Guide.png');
                        message.reply(shadowEmbed);
                        break;
                }
                break;
            case "pally":
                switch(args[1]) {
                    case "holy":
                        const holypEmbed = new response('#F292AC', 'Holy Paladin', "https://www.icy-veins.com/wow/holy-paladin-pve-healing-guide",
                            'https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Paladin-Guide.png');
                        message.reply(holypEmbed);
                        break;
                    case "protection":
                        const protEmbed = new response('#F292AC', 'Protection Paladin', "https://www.icy-veins.com/wow/protection-paladin-pve-tank-guide",
                            'https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Paladin-Guide.png');
                        message.reply(protEmbed);
                        break;
                    case "retribution":
                        const retrEmbed = new response('#F292AC', 'Retribution Paladin', "https://www.icy-veins.com/wow/retribution-paladin-pve-dps-guide",
                            'https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Paladin-Guide.png');
                        message.reply(retrEmbed);
                        break;
                }
                break;
            case "rogue":
                switch(args[1]) {
                    case "assassin":
                        const assEmbed = new response('#FFEF70', 'Assassination Rogue', "https://www.icy-veins.com/wow/assassination-rogue-pve-dps-guide",
                            'https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Rogue-Guide.png');
                        message.reply(assEmbed);
                        break;
                    case "outlaw":
                        const outEmbed = new response('#FFEF70', 'Outlaw Rogue', "https://www.icy-veins.com/wow/outlaw-rogue-pve-dps-guide",
                            'https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Rogue-Guide.png');
                        message.reply(outEmbed);
                        break;
                    case "subtlety":
                        const subEmbed = new response('#FFEF70', 'Subtlety Rogue', "https://www.icy-veins.com/wow/subtlety-rogue-pve-dps-guide",
                            'https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Rogue-Guide.png');
                        message.reply(subEmbed);
                        break;
                }
                break;
            case "shaman":
                switch(args[1]) {
                    case "elemental":
                        const elemEmbed = new response('#2686DF', 'Elemental Shaman', "https://www.icy-veins.com/wow/elemental-shaman-pve-dps-guide",
                            'https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Shaman-Guide.png');
                        message.reply(elemEmbed);
                        break;
                    case "enhancement":
                        const enhEmbed = new response('#2686DF', 'Enhancement Shaman', "https://www.icy-veins.com/wow/enhancement-shaman-pve-dps-guide",
                            'https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Shaman-Guide.png');
                        message.reply(enhEmbed);
                        break;
                    case "restoration":
                        const restsEmbed = new response('#2686DF', 'Restoration Shaman', "https://www.icy-veins.com/wow/restoration-shaman-pve-healing-guide",
                            'https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Shaman-Guide.png');
                        message.reply(restsEmbed);
                        break;
                }
                break;
            case "warrior":
                switch(args[1]) {
                    case "arms":
                        const armsEmbed = new response('#AF9074', 'Arms Warrior', "https://www.icy-veins.com/wow/arms-warrior-pve-dps-guide",
                            'https://media-hearth.cursecdn.com/attachments/0/157/warrior_11.png');
                        message.reply(armsEmbed);
                        break;
                    case "fury":
                        const furyEmbed = new response('#AF9074', 'Fury Warrior', "https://www.icy-veins.com/wow/fury-warrior-pve-dps-guide",
                            'https://media-hearth.cursecdn.com/attachments/0/157/warrior_11.png');
                        message.reply(furyEmbed);
                        break;
                    case "protection":
                        const protwEmbed = new response('#AF9074', 'Protection Warrior', "https://www.icy-veins.com/wow/protection-warrior-pve-tank-guide",
                            'https://media-hearth.cursecdn.com/attachments/0/157/warrior_11.png');
                        message.reply(protwEmbed);
                        break;
                }
                break;
        }
    }
}