import { SlashCommandBuilder } from "@discordjs/builders";
import { ICommand } from "../interfaces/ICommand";
import { CommandInteraction, EmbedBuilder } from "discord.js";
import { UserService } from "../services/UserService";

export const View: ICommand = {
	data: new SlashCommandBuilder()
		.setName("view")
		.setDescription("Shows your user profile"),
	run: async (interaction: CommandInteraction) => {
		await interaction.deferReply();
		// If not a chat input command -- HALT!
		if (!interaction.isChatInputCommand()) return;

		const { user } = interaction;
		const targetUser = await UserService.getUserData(user.id);
		
		if (!targetUser) {
			await interaction.editReply({
				content: "It looks like you haven't registered with Nacho-Bot!"
			});
			return;
		}

		const userEmbed = new EmbedBuilder();
		userEmbed.setTitle(`${user.username}'s Profile`);
		userEmbed.setDescription('Stats:');
		userEmbed.setAuthor({
			name: user.tag,
			iconURL: user.displayAvatarURL()
		});

		userEmbed.addFields(
			{ name: 'Score', value: targetUser.score.toString()},
			{ name: 'Day', value: targetUser.day.toString()},
			{ name: 'Week', value: targetUser.week.toString()},
			{ name: 'Items in inventory', value: targetUser.inventory.length.toString()},
		);
		userEmbed.setTimestamp();
		userEmbed.setFooter({
			text: `Called by ${user.username}`, 
			iconURL: user.displayAvatarURL()
		})

		await interaction.editReply({embeds: [userEmbed]});
	},
}