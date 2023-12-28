import { CommandInteraction, SlashCommandBuilder, EmbedBuilder, APIEmbedField, NonSystemMessageType } from "discord.js";
import { getAstroForecast } from "../services/stormglass"
import { config } from "../config";

export const data = new SlashCommandBuilder()
	.setName("astroforecast")
	.setDescription("Returns the astronomical forecast for the next 3 days at Jordan Lake, NC");

export async function execute(interaction: CommandInteraction) {
	try {
		console.log('running astroforecast...')
		await interaction.deferReply({ ephemeral: false });

		let astroForecast = await fetch(`https://api.stormglass.io/v2/astronomy/point?lat=35.7126&lng=79.0363`, {
			headers: {
				'Authorization': config.STORMGLASS_KEY
			}
		}).then((res) => res.json().then((jsonData) => {
			return jsonData;
		}));

		let weatherForecast = await fetch(`https://api.stormglass.io/v2/weather/point?lat=35.7126&lng=79.0363&params=cloudCover,humidity,currentDirection,currentSpeed`, {
			headers: {
				'Authorization': config.STORMGLASS_KEY
			}
		}).then((res) => res.json().then((jsonData) => {
			return jsonData;
		}));
		console.log('astroForecast: ', astroForecast)
		let windowOne = `${astroForecast.data[0].astronomicalDawn} - ${astroForecast.data[0].astronomicalDusk}`
		let moonPhase = astroForecast.data[0].moonPhase.current.text
		let moonRise = astroForecast.data[0].moonrise
		let moonSet = astroForecast.data[0].moonset

		console.log('weatherForecast: ', weatherForecast)

		// let cloudCover = weatherForecast.data[0].cloudCover;
		// let humidity = weatherForecast.data[0].humidity;
		// let windDirection = weatherForecast.data[0].currentDirection;
		// let windSpeed = weatherForecast.data[0].currentSpeed;

		const fields: APIEmbedField[] = [
			{ name: "Day One", value: String(windowOne) },
			{ name: "Moon Phase", value: String(moonPhase) },
			{ name: "Moonrise", value: String(moonRise) },
			{ name: "Moonset", value: String(moonSet) },
			// { name: "Cloud Cover", value: cloudCover },
			// { name: "Humidity", value: humidity },
			// { name: "Wind Direction", value: windDirection },
			// { name: "Wind Speed", value: windSpeed },
		]
		const messageResponse = new EmbedBuilder()
			.setTitle("Astro Forecast")
			.setThumbnail("https://i.etsystatic.com/32555465/r/il/3e8746/4135346636/il_570xN.4135346636_2uub.jpg")
			.addFields(fields)

		return interaction.editReply({embeds: [messageResponse]});

	} catch (error) {
		console.log('error:', error)
		interaction.editReply({ content: "Something went wrong..." });
	}


}