import dotenv from "dotenv";

dotenv.config();

const { 
	BOT_TOKEN, 
	CLIENT_ID,
	MONGO_URI,
	STORMGLASS_KEY,
} = process.env;

if (!BOT_TOKEN || !CLIENT_ID || !MONGO_URI  || !STORMGLASS_KEY) {
  throw new Error("Missing environment variables");
}

export const config = {
	BOT_TOKEN,
  	CLIENT_ID,
  	MONGO_URI,
	STORMGLASS_KEY
};
