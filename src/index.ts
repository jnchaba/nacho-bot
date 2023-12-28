import { Client } from "discord.js";
import { config } from "./config";
import { commands } from "./commands";
import { deployCommands } from "./scripts/deploy-commands";

const client = new Client({
  intents: ["Guilds", "GuildMessages", "DirectMessages"],
});

client.once("ready", async() => {
  console.log("Discord bot is ready! 🤖");
  await deployCommands({ guildId: "469341271484530688"});
});

client.on("guildCreate", async (guild) => {
  await deployCommands({ guildId: "469341271484530688"});
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }
  const { commandName } = interaction;
  if (commands[commandName as keyof typeof commands]) {
    commands[commandName as keyof typeof commands].execute(interaction);
  }
});

client.login(config.BOT_TOKEN);
