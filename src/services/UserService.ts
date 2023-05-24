import UserModel, { IUser } from "../database/models/UserModel";

const updateUserData = async (User: IUser) => {
    User.score++;
	if (User.day > 15) {
		User.day = 1;
		User.week++;
	}
	User.timestamp = Date.now();
	await User.save();
	return User;
};

const getUserData = async (id: string) => {
	const userData = (await UserModel.findOne({ discordId: id })) || null;
	return userData;
};

const createNewUser = async (id: string) => {
	const doesUserExist = await getUserData(id);
	if (doesUserExist === null) {
		const userData = await UserModel.create({
			discordId: id,
			score: 0,
			day: 0,
			week: 0,
			inventory: [],
			timestamp: Date.now(),
		});
		return userData;
	} else {
		return doesUserExist;
	}
}

export const UserService = { createNewUser, updateUserData, getUserData};