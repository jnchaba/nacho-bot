const { Client, GatewayIntentBits, Partials } = require('discord.js');
import { connectDatabase } from "./database/connectDatabase";
import { validateEnv } from "./utils/validateEnv"
import { onInteraction } from "./events/onInteraction";
import { Interaction } from "discord.js";

(async () => {
	if (!validateEnv()) return;

	const BOT = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] });

	BOT.on("ready", () => console.log("Connected to Discord"));
	BOT.on(
		"interactionCreate",
		async (interaction: Interaction) => await onInteraction(interaction)
	);

	await connectDatabase();

	await BOT.login(process.env.BOT_TOKEN);
	
})();