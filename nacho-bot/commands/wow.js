const { MessageAttachment } = require('discord.js');
const Discord = require('discord.js');

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
                                { name: 'Pritest Specs', value: '!wow priest discipline/holy/shadow' },
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
                        const balanceEmbed = new Discord.MessageEmbed()
                            .setColor('#A5571F')
                            .setTitle('Balance Druid')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/balance-druid-pve-dps-guide")
                            .setThumbnail('https://media-hearth.cursecdn.com/attachments/0/149/druid_22.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(balanceEmbed);
                        break;
                    case "feral":
                        const feralEmbed = new Discord.MessageEmbed()
                            .setColor('#A5571F')
                            .setTitle('Feral Druid')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/feral-druid-pve-dps-guide")
                            .setThumbnail('https://media-hearth.cursecdn.com/attachments/0/149/druid_22.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(feralEmbed);
                        break;
                    case "resto":
                        const restoEmbed = new Discord.MessageEmbed()
                            .setColor('#A5571F')
                            .setTitle('Resto Druid')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/restoration-druid-pve-healing-guide")
                            .setThumbnail('https://media-hearth.cursecdn.com/attachments/0/149/druid_22.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(restoEmbed);
                        break;
                    case "guardian":
                        const guardianEmbed = new Discord.MessageEmbed()
                            .setColor('#A5571F')
                            .setTitle('Guardian Druid')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/guardian-druid-pve-tank-guide")
                            .setThumbnail('https://media-hearth.cursecdn.com/attachments/0/149/druid_22.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(guardianEmbed);
                        break;
                }
                break;
            case "dk":
                switch(args[1]) {
                    case "unholy":
                        const unholyEmbed = new Discord.MessageEmbed()
                            .setColor('#CE375F')
                            .setTitle('Unholy Death Knight')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/unholy-death-knight-pve-dps-guide")
                            .setThumbnail('https://media-hearth.cursecdn.com/attachments/0/148/deathknight_15.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(unholyEmbed);
                        break;
                    case "frost":
                        const frostEmbed = new Discord.MessageEmbed()
                            .setColor('#CE375F')
                            .setTitle('Frost Death Knight')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/frost-death-knight-pve-dps-guide")
                            .setThumbnail('https://media-hearth.cursecdn.com/attachments/0/148/deathknight_15.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(frostEmbed);
                        break;
                    case "blood":
                        const bloodEmbed = new Discord.MessageEmbed()
                            .setColor('#CE375F')
                            .setTitle('Blood Death Knight')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/blood-death-knight-pve-tank-guide")
                            .setThumbnail('https://media-hearth.cursecdn.com/attachments/0/148/deathknight_15.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(bloodEmbed);
                        break;
                }
                break;
            case "dh":
                switch(args[1]) {
                    case "havoc":
                        const havocEmbed = new Discord.MessageEmbed()
                            .setColor('#A330C9')
                            .setTitle('Havoc Demon Hunter')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/havoc-demon-hunter-pve-dps-guide")
                            .setThumbnail('http://media.blizzard.com/wow/legion-6a153ad2/images/metamorphosis-icon.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(havocEmbed);
                        break;
                    case "vengeance":
                        const vengeanceEmbed = new Discord.MessageEmbed()
                            .setColor('#A330C9')
                            .setTitle('Vengeance Demon Hunter')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/vengeance-demon-hunter-pve-tank-guide")
                            .setThumbnail('http://media.blizzard.com/wow/legion-6a153ad2/images/metamorphosis-icon.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(vengeanceEmbed);
                        break;
                }
                break;
            case "hunter":
                switch(args[1]) {
                    case "bm":
                        const bmEmbed = new Discord.MessageEmbed()
                            .setColor('#9BC075')
                            .setTitle('Beast Mastery Hunter')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/beast-mastery-hunter-pve-dps-guide")
                            .setThumbnail('https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Hunter-Guide.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(bmEmbed);
                        break;
                    case "marksmanship":
                        const marksEmbed = new Discord.MessageEmbed()
                            .setColor('#9BC075')
                            .setTitle('Marksmanship Hunter')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/marksmanship-hunter-pve-dps-guide")
                            .setThumbnail('https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Hunter-Guide.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(marksEmbed);
                        break;
                    case "survival":
                        const survEmbed = new Discord.MessageEmbed()
                            .setColor('#9BC075')
                            .setTitle('Survival Hunter')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/survival-hunter-pve-dps-guide")
                            .setThumbnail('https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Hunter-Guide.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(survEmbed);
                        break;
                }
                break;
            case "mage":
                switch(args[1]) {
                    case "arcane":
                        const arcaneEmbed = new Discord.MessageEmbed()
                            .setColor('#8BDEFB')
                            .setTitle('Arcane Mage')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/arcane-mage-pve-dps-guide")
                            .setThumbnail('https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Mage-Guide.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(arcaneEmbed);
                        break;
                    case "fire":
                        const fireEmbed = new Discord.MessageEmbed()
                            .setColor('#8BDEFB')
                            .setTitle('Fire Mage')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/fire-mage-pve-dps-guide")
                            .setThumbnail('https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Mage-Guide.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(fireEmbed);
                        break;
                    case "frost":
                        const frostmEmbed = new Discord.MessageEmbed()
                            .setColor('#8BDEFB')
                            .setTitle('Frost Mage')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/frost-mage-pve-dps-guide")
                            .setThumbnail('https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Mage-Guide.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(frostmEmbed);
                        break;
                }
                break;
            case "lock":
                switch(args[1]) {
                    case "affliction":
                        const affEmbed = new Discord.MessageEmbed()
                            .setColor('#9860B7')
                            .setTitle('Affliction Warlock')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/affliction-warlock-pve-dps-guide")
                            .setThumbnail('https://media-hearth.cursecdn.com/attachments/0/156/warlock_21.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(affEmbed);
                        break;
                    case "demonology":
                        const demonEmbed = new Discord.MessageEmbed()
                            .setColor('#9860B7')
                            .setTitle('Demonology Warlock')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/demonology-warlock-pve-dps-guide")
                            .setThumbnail('https://media-hearth.cursecdn.com/attachments/0/156/warlock_21.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(demonEmbed);
                        break;
                    case "destruction":
                        const destEmbed = new Discord.MessageEmbed()
                            .setColor('#9860B7')
                            .setTitle('Destruction Warlock')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/destruction-warlock-pve-dps-guide")
                            .setThumbnail('https://media-hearth.cursecdn.com/attachments/0/156/warlock_21.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(destEmbed);
                        break;
                }
                break;
            case "monk":
                switch(args[1]) {
                    case "brew":
                        const brewEmbed = new Discord.MessageEmbed()
                            .setColor('#37A587')
                            .setTitle('Brewmaster Monk')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/brewmaster-monk-pve-tank-guide")
                            .setThumbnail('https://odealo.com/uploads/public/World%20of%20Warcraft/Monk/Monk_image.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(brewEmbed);
                        break;
                    case "mist":
                        const mistEmbed = new Discord.MessageEmbed()
                            .setColor('#37A587')
                            .setTitle('Mistweaver Monk')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/mistweaver-monk-pve-healing-guide")
                            .setThumbnail('https://odealo.com/uploads/public/World%20of%20Warcraft/Monk/Monk_image.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(mistEmbed);
                        break;
                    case "wind":
                        const windEmbed = new Discord.MessageEmbed()
                            .setColor('#37A587')
                            .setTitle('Windwalker Monk')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/windwalker-monk-pve-dps-guide")
                            .setThumbnail('https://odealo.com/uploads/public/World%20of%20Warcraft/Monk/Monk_image.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(windEmbed);
                        break;
                }
                break;
            case "priest":
                switch(args[1]) {
                    case "discipline":
                        const disciplineEmbed = new Discord.MessageEmbed()
                            .setColor('#FFFFFF')
                            .setTitle('Discipline Priest')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/discipline-priest-pve-healing-guide")
                            .setThumbnail('https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Priest-Guide.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(disciplineEmbed);
                        break;
                    case "holy":
                        const holyEmbed = new Discord.MessageEmbed()
                            .setColor('#FFFFFF')
                            .setTitle('Holy Priest')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/holy-priest-pve-healing-guide")
                            .setThumbnail('https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Priest-Guide.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(holyEmbed);
                        break;
                    case "shadow":
                        const shadowEmbed = new Discord.MessageEmbed()
                            .setColor('#FFFFFF')
                            .setTitle('Shadow Priest')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/shadow-priest-pve-dps-guide")
                            .setThumbnail('https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Priest-Guide.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(shadowEmbed);
                        break;
                }
                break;
            case "pally":
                switch(args[1]) {
                    case "holy":
                        const holypEmbed = new Discord.MessageEmbed()
                            .setColor('#F292AC')
                            .setTitle('Holy Paladin')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/holy-paladin-pve-healing-guide")
                            .setThumbnail('https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Paladin-Guide.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(holypEmbed);
                        break;
                    case "protection":
                        const protEmbed = new Discord.MessageEmbed()
                            .setColor('#F292AC')
                            .setTitle('Protection Paladin')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/protection-paladin-pve-tank-guide")
                            .setThumbnail('https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Paladin-Guide.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(protEmbed);
                        break;
                    case "retribution":
                        const retrEmbed = new Discord.MessageEmbed()
                            .setColor('#F292AC')
                            .setTitle('Retribution Paladin')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/retribution-paladin-pve-dps-guide")
                            .setThumbnail('https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Paladin-Guide.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(retrEmbed);
                        break;
                }
                break;
            case "rogue":
                switch(args[1]) {
                    case "assassin":
                        const assEmbed = new Discord.MessageEmbed()
                            .setColor('#FFEF70')
                            .setTitle('Assassination Rogue')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/assassination-rogue-pve-dps-guide")
                            .setThumbnail('https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Rogue-Guide.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(assEmbed);
                        break;
                    case "outlaw":
                        const outEmbed = new Discord.MessageEmbed()
                            .setColor('#FFEF70')
                            .setTitle('Outlaw Rogue')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/outlaw-rogue-pve-dps-guide")
                            .setThumbnail('https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Rogue-Guide.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(outEmbed);
                        break;
                    case "subtlety":
                        const subEmbed = new Discord.MessageEmbed()
                            .setColor('#FFEF70')
                            .setTitle('Subtlety Rogue')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/subtlety-rogue-pve-dps-guide")
                            .setThumbnail('https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Rogue-Guide.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(subEmbed);
                        break;
                }
                break;
            case "shaman":
                switch(args[1]) {
                    case "elemental":
                        const elemEmbed = new Discord.MessageEmbed()
                            .setColor('#2686DF')
                            .setTitle('Elemental Shaman')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/elemental-shaman-pve-dps-guide")
                            .setThumbnail('https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Shaman-Guide.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(elemEmbed);
                        break;
                    case "enhancement":
                        const enhEmbed = new Discord.MessageEmbed()
                            .setColor('#2686DF')
                            .setTitle('Enhancement Shaman')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/enhancement-shaman-pve-dps-guide")
                            .setThumbnail('https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Shaman-Guide.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(enhEmbed);
                        break;
                    case "restoration":
                        const restsEmbed = new Discord.MessageEmbed()
                            .setColor('#2686DF')
                            .setTitle('Restoration Shaman')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/restoration-shaman-pve-healing-guide")
                            .setThumbnail('https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Shaman-Guide.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(restsEmbed);
                        break;
                }
                break;
            case "warrior":
                switch(args[1]) {
                    case "arms":
                        const armsEmbed = new Discord.MessageEmbed()
                            .setColor('#AF9074')
                            .setTitle('Arms Warrior')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/arms-warrior-pve-dps-guide")
                            .setThumbnail('https://media-hearth.cursecdn.com/attachments/0/157/warrior_11.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(armsEmbed);
                        break;
                    case "fury":
                        const furyEmbed = new Discord.MessageEmbed()
                            .setColor('#AF9074')
                            .setTitle('Fury Warrior')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/fury-warrior-pve-dps-guide")
                            .setThumbnail('https://media-hearth.cursecdn.com/attachments/0/157/warrior_11.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(furyEmbed);
                        break;
                    case "protection":
                        const protwEmbed = new Discord.MessageEmbed()
                            .setColor('#AF9074')
                            .setTitle('Protection Warrior')
                            .setAuthor('nacho-bot', 'https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256')
                            .setDescription("https://www.icy-veins.com/wow/protection-warrior-pve-tank-guide")
                            .setThumbnail('https://media-hearth.cursecdn.com/attachments/0/157/warrior_11.png')
                            .setImage('https://static.icy-veins.com/images/common/logo.png')
                            .setTimestamp()
                            .setFooter('"It Just Works"', 'https://i.imgur.com/824WrKf.png')
                        message.reply(protwEmbed);
                        break;
                }
                break;
        }
    }
}