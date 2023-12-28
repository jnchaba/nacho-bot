import { CommandInteraction, SlashCommandBuilder, EmbedBuilder, APIEmbedField, NonSystemMessageType } from "discord.js";
import { getAstroForecast } from "../services/stormglass"
import { config } from "../config";

export const data = new SlashCommandBuilder()
	.setName("astroforecast")
	.setDescription("Returns the astronomical forecast for the next 3 days at Jordan Lake, NC");

export async function execute(interaction: CommandInteraction) {
	try {
		console.log('running astroforecast...')
		await interaction.deferReply({ ephemeral: true });
		// let astroForecast: any = {
		// 	data: [
		// 	  {
		// 		astronomicalDawn: '2023-12-28T00:22:13+00:00',
		// 		astronomicalDusk: '2023-12-28T13:10:16+00:00',
		// 		civilDawn: '2023-12-28T01:25:18+00:00',
		// 		civilDusk: '2023-12-28T12:07:11+00:00',
		// 		moonFraction: 0.994164234185678,
		// 		moonPhase: [Object],
		// 		moonrise: '2023-12-27T11:41:01+00:00',
		// 		moonset: '2023-12-27T02:19:18+00:00',
		// 		nauticalDawn: '2023-12-28T00:53:20+00:00',
		// 		nauticalDusk: '2023-12-28T12:39:09+00:00',
		// 		sunrise: '2023-12-28T01:53:45+00:00',
		// 		sunset: '2023-12-28T11:38:45+00:00',
		// 		time: '2023-12-27T12:00:00+00:00'
		// 	  },
		// 	  {
		// 		astronomicalDawn: '2023-12-29T00:22:34+00:00',
		// 		astronomicalDusk: '2023-12-29T13:10:53+00:00',
		// 		civilDawn: '2023-12-29T01:25:37+00:00',
		// 		civilDusk: '2023-12-29T12:07:49+00:00',
		// 		moonFraction: 0.9720913842060359,
		// 		moonPhase: [Object],
		// 		moonrise: '2023-12-28T12:41:27+00:00',
		// 		moonset: '2023-12-28T03:09:44+00:00',
		// 		nauticalDawn: '2023-12-29T00:53:40+00:00',
		// 		nauticalDusk: '2023-12-29T12:39:46+00:00',
		// 		sunrise: '2023-12-29T01:54:03+00:00',
		// 		sunset: '2023-12-29T11:39:24+00:00',
		// 		time: '2023-12-28T12:00:00+00:00'
		// 	  },
		// 	  {
		// 		astronomicalDawn: '2023-12-30T00:22:53+00:00',
		// 		astronomicalDusk: '2023-12-30T13:11:30+00:00',
		// 		civilDawn: '2023-12-30T01:25:55+00:00',
		// 		civilDusk: '2023-12-30T12:08:29+00:00',
		// 		moonFraction: 0.9328761490799113,
		// 		moonPhase: [Object],
		// 		moonrise: '2023-12-29T13:43:19+00:00',
		// 		moonset: '2023-12-29T03:51:52+00:00',
		// 		nauticalDawn: '2023-12-30T00:53:59+00:00',
		// 		nauticalDusk: '2023-12-30T12:40:25+00:00',
		// 		sunrise: '2023-12-30T01:54:19+00:00',
		// 		sunset: '2023-12-30T11:40:04+00:00',
		// 		time: '2023-12-29T12:00:00+00:00'
		// 	  },
		// 	  {
		// 		astronomicalDawn: '2023-12-31T00:23:11+00:00',
		// 		astronomicalDusk: '2023-12-31T13:12:09+00:00',
		// 		civilDawn: '2023-12-31T01:26:10+00:00',
		// 		civilDusk: '2023-12-31T12:09:09+00:00',
		// 		moonFraction: 0.8787199601993294,
		// 		moonPhase: [Object],
		// 		moonrise: '2023-12-30T14:44:23+00:00',
		// 		moonset: '2023-12-30T04:26:50+00:00',
		// 		nauticalDawn: '2023-12-31T00:54:15+00:00',
		// 		nauticalDusk: '2023-12-31T12:41:04+00:00',
		// 		sunrise: '2023-12-31T01:54:34+00:00',
		// 		sunset: '2023-12-31T11:40:46+00:00',
		// 		time: '2023-12-30T12:00:00+00:00'
		// 	  },
		// 	  {
		// 		astronomicalDawn: '2024-01-01T00:23:27+00:00',
		// 		astronomicalDusk: '2024-01-01T13:12:49+00:00',
		// 		civilDawn: '2024-01-01T01:26:24+00:00',
		// 		civilDusk: '2024-01-01T12:09:51+00:00',
		// 		moonFraction: 0.8117850091025471,
		// 		moonPhase: [Object],
		// 		moonrise: '2023-12-31T15:43:38+00:00',
		// 		moonset: '2023-12-31T04:56:19+00:00',
		// 		nauticalDawn: '2024-01-01T00:54:31+00:00',
		// 		nauticalDusk: '2024-01-01T12:41:45+00:00',
		// 		sunrise: '2024-01-01T01:54:46+00:00',
		// 		sunset: '2024-01-01T11:41:29+00:00',
		// 		time: '2023-12-31T12:00:00+00:00'
		// 	  },
		// 	  {
		// 		astronomicalDawn: '2024-01-02T00:23:41+00:00',
		// 		astronomicalDusk: '2024-01-02T13:13:29+00:00',
		// 		civilDawn: '2024-01-02T01:26:37+00:00',
		// 		civilDusk: '2024-01-02T12:10:34+00:00',
		// 		moonFraction: 0.734190063520412,
		// 		moonPhase: [Object],
		// 		moonrise: '2024-01-01T16:41:05+00:00',
		// 		moonset: '2024-01-01T05:21:58+00:00',
		// 		nauticalDawn: '2024-01-02T00:54:44+00:00',
		// 		nauticalDusk: '2024-01-02T12:42:26+00:00',
		// 		sunrise: '2024-01-02T01:54:57+00:00',
		// 		sunset: '2024-01-02T11:42:13+00:00',
		// 		time: '2024-01-01T12:00:00+00:00'
		// 	  },
		// 	  {
		// 		astronomicalDawn: '2024-01-03T00:23:55+00:00',
		// 		astronomicalDusk: '2024-01-03T13:14:11+00:00',
		// 		civilDawn: '2024-01-03T01:26:47+00:00',
		// 		civilDusk: '2024-01-03T12:11:18+00:00',
		// 		moonFraction: 0.6480967878029512,
		// 		moonPhase: [Object],
		// 		moonrise: '2024-01-02T17:37:26+00:00',
		// 		moonset: '2024-01-02T05:45:17+00:00',
		// 		nauticalDawn: '2024-01-03T00:54:57+00:00',
		// 		nauticalDusk: '2024-01-03T12:43:09+00:00',
		// 		sunrise: '2024-01-03T01:55:06+00:00',
		// 		sunset: '2024-01-03T11:42:59+00:00',
		// 		time: '2024-01-02T12:00:00+00:00'
		// 	  },
		// 	  {
		// 		astronomicalDawn: '2024-01-04T00:24:06+00:00',
		// 		astronomicalDusk: '2024-01-04T13:14:53+00:00',
		// 		civilDawn: '2024-01-04T01:26:56+00:00',
		// 		civilDusk: '2024-01-04T12:12:03+00:00',
		// 		moonFraction: 0.555846094002119,
		// 		moonPhase: [Object],
		// 		moonrise: '2024-01-03T18:33:44+00:00',
		// 		moonset: '2024-01-03T06:07:32+00:00',
		// 		nauticalDawn: '2024-01-04T00:55:07+00:00',
		// 		nauticalDusk: '2024-01-04T12:43:53+00:00',
		// 		sunrise: '2024-01-04T01:55:13+00:00',
		// 		sunset: '2024-01-04T11:43:46+00:00',
		// 		time: '2024-01-03T12:00:00+00:00'
		// 	  },
		// 	  {
		// 		astronomicalDawn: '2024-01-05T00:24:16+00:00',
		// 		astronomicalDusk: '2024-01-05T13:15:37+00:00',
		// 		civilDawn: '2024-01-05T01:27:03+00:00',
		// 		civilDusk: '2024-01-05T12:12:50+00:00',
		// 		moonFraction: 0.4601030433274986,
		// 		moonPhase: [Object],
		// 		moonrise: '2024-01-04T19:31:14+00:00',
		// 		moonset: '2024-01-04T06:29:57+00:00',
		// 		nauticalDawn: '2024-01-05T00:55:16+00:00',
		// 		nauticalDusk: '2024-01-05T12:44:37+00:00',
		// 		sunrise: '2024-01-05T01:55:19+00:00',
		// 		sunset: '2024-01-05T11:44:35+00:00',
		// 		time: '2024-01-04T12:00:00+00:00'
		// 	  },
		// 	  {
		// 		astronomicalDawn: '2024-01-06T00:24:25+00:00',
		// 		astronomicalDusk: '2024-01-06T13:16:21+00:00',
		// 		civilDawn: '2024-01-06T01:27:09+00:00',
		// 		civilDusk: '2024-01-06T12:13:37+00:00',
		// 		moonFraction: 0.36397238867181103,
		// 		moonPhase: [Object],
		// 		moonrise: '2024-01-05T20:31:08+00:00',
		// 		moonset: '2024-01-05T06:53:48+00:00',
		// 		nauticalDawn: '2024-01-06T00:55:23+00:00',
		// 		nauticalDusk: '2024-01-06T12:45:23+00:00',
		// 		sunrise: '2024-01-06T01:55:22+00:00',
		// 		sunset: '2024-01-06T11:45:24+00:00',
		// 		time: '2024-01-05T12:00:00+00:00'
		// 	  },
		// 	  {
		// 		astronomicalDawn: '2024-01-07T00:24:32+00:00',
		// 		astronomicalDusk: '2024-01-07T13:17:06+00:00',
		// 		civilDawn: '2024-01-07T01:27:12+00:00',
		// 		civilDusk: '2024-01-07T12:14:26+00:00',
		// 		moonFraction: 0.2710526068521889,
		// 		moonPhase: [Object],
		// 		moonrise: '2024-01-06T21:34:22+00:00',
		// 		moonset: '2024-01-06T07:20:37+00:00',
		// 		nauticalDawn: '2024-01-07T00:55:29+00:00',
		// 		nauticalDusk: '2024-01-07T12:46:10+00:00',
		// 		sunrise: '2024-01-07T01:55:24+00:00',
		// 		sunset: '2024-01-07T11:46:15+00:00',
		// 		time: '2024-01-06T12:00:00+00:00'
		// 	  }
		// ]};

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