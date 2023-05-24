import { SlashCommandBuilder } from "@discordjs/builders";
import { ICommand } from "../interfaces/ICommand";
import { CommandInteraction, EmbedBuilder } from "discord.js";
import { UserService } from "../services/UserService";

export const About: ICommand = {
	data: new SlashCommandBuilder()
		.setName("about")
		.setDescription("About Nacho Bot")
		.addBooleanOption((option) =>
			option
			.setName("verbose")
			.setDescription("set to true for additional info")
			.setRequired(false)
		),
	run: async (interaction: CommandInteraction) => {
		await interaction.deferReply();
		// If not a chat input command -- HALT!
		if (!interaction.isChatInputCommand()) return;

		const { user } = interaction;

		const aboutEmbed = new EmbedBuilder();
		aboutEmbed.setTitle('About NachoBot');
		aboutEmbed.setDescription('NachoBot is a multipurpose bot with a suite of features currently being developed');
		aboutEmbed.setAuthor({
			name: "nacho-bot",
			iconURL: "https://cdn.discordapp.com/app-icons/769781677747863592/fd1ed280e50b3f16bc401dd698b8096b.png?size=256"
		});
		aboutEmbed.addFields(
			{ name: 'Field 1', value: 'Value 1'},
			{ name: 'Field 2', value: 'Value 2'},
		);
		aboutEmbed.setTimestamp();
		aboutEmbed.setFooter({
			text: `Called by ${user.username}`, 
			iconURL: user.avatarURL() as string
		})

		await interaction.editReply({embeds: [aboutEmbed]});
	},
}