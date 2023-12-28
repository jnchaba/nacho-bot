import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Returns bot status");

export async function execute(interaction: CommandInteraction) {
  return interaction.reply("Status: :white_check_mark:   Uptime: " + format(process.uptime()));
}

function format(seconds: number): String {
	function pad(s: number){
	  return (s < 10 ? '0' : '') + s;
	}
	var hours = Math.floor(seconds / (60*60));
	var minutes = Math.floor(seconds % (60*60) / 60);
	var seconds = Math.floor(seconds % 60);
  
	return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
}