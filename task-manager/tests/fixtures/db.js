const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../src/models/user");
const Task = require("../../src/models/task");

const UserOneID = new mongoose.Types.ObjectId();
const UserOne = {
	_id: UserOneID,
	name: "Angelina Jolie",
	email: "angie@example.com",
	password: "test123",
	tokens: [
		{
			token: jwt.sign({ _id: UserOneID }, process.env.JWT_SECRET),
		},
	],
};
const User2ID = new mongoose.Types.ObjectId();
const User2 = {
	_id: User2ID,
	name: "Angelina De'Jolie",
	email: "jolie@example.com",
	password: "test456",
	tokens: [
		{
			token: jwt.sign({ _id: UserOneID }, process.env.JWT_SECRET),
		},
	],
};
const task1 = {
	_id: new mongoose.Types.ObjectId(),
	description: "First task",
	completed: false,
	owner: UserOneID,
};
const task2 = {
	_id: new mongoose.Types.ObjectId(),
	description: "2nd task",
	completed: true,
	owner: UserOneID,
};
const task3 = {
	_id: new mongoose.Types.ObjectId(),
	description: "3rd task",
	completed: false,
	owner: User2ID,
};
const setUpDB = async () => {
	await User.deleteMany({});
	await Task.deleteMany();
	await new User(UserOne).save();
	await new User(User2).save();
	await new Task(task1).save();
	await new Task(task2).save();
	await new Task(task3).save();
};
module.exports = {
	setUpDB,
	UserOne,
	UserOneID,
	User2,
	User2ID,
	task1,
	task2,
	task3,
};
