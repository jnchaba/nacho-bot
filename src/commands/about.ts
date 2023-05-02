import { SlashCommandBuilder } from "@discordjs/builders";
import { ICommand } from "../interfaces/ICommand";
import { CommandInteraction } from "discord.js";
import { UserService } from "../services/UserService";

export const about: ICommand = {
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
		const verbose = interaction.options.getBoolean('verbose', true);
		const targetUser = await UserService.getUserData(user.id);
		const updatedUser = await UserService.updateUserData(targetUser);
	},
}