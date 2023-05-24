import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
	discordId: string;
	score: number;
	day: number;
	week: number;
	inventory: [];
	timestamp: number;
}

export const User = new Schema({
	discordId: String,
	score: Number,
	day: Number,
	week: Number,
	inventory: [],
	timestamp: Number
});

export default model<IUser>("user", User);