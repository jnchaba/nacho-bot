import { SlashCommandBuilder } from "@discordjs/builders";
import { ICommand } from "../interfaces/ICommand";
import { CommandInteraction, EmbedBuilder } from "discord.js";
import { UserService } from "../services/UserService";

export const Register: ICommand = {
	data: new SlashCommandBuilder()
		.setName("register")
		.setDescription("Registers your discord profile with nacho-bot"),
	run: async (interaction: CommandInteraction) => {
		await interaction.deferReply();
		// If not a chat input command -- HALT!
		if (!interaction.isChatInputCommand()) return;

		const { user } = interaction;
		const targetUser = await UserService.getUserData(user.id);
		
		if (targetUser) {
			await interaction.editReply({
				content: "You've already registered with nacho-bot!"
			});
			return;
		}

		const newUser = await UserService.createNewUser(user.id);

		const userEmbed = new EmbedBuilder();
		userEmbed.setTitle(`${user.username}'s Profile Successfully Created`);
		userEmbed.setDescription('Stats:');
		userEmbed.setAuthor({
			name: user.tag,
			iconURL: user.displayAvatarURL()
		});

		userEmbed.addFields(
			{ name: 'Score', value: newUser.score.toString()},
			{ name: 'Day', value: newUser.day.toString()},
			{ name: 'Week', value: newUser.week.toString()},
			{ name: 'Items in inventory', value: newUser.inventory.length.toString()},
		);
		userEmbed.setTimestamp();
		userEmbed.setFooter({
			text: `Called by ${user.username}`, 
			iconURL: user.displayAvatarURL()
		})

		await interaction.editReply({embeds: [userEmbed]});
	},
}