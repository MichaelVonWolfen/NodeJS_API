const { app, server, io } = require("./app");
const PORT = process.env.PORT || 3000;
const {
	generateMessage,
	generateLocationMessage,
} = require("./utils/messages");
const {
	getUser,
	getUsersInRoom,
	removeUser,
	addUser,
} = require("./utils/users");
io.on("connection", (socket) => {
	console.log("New Websocket connection!");
	// socket.emit("countUpdated", count);
	// socket.on("incrementCounter", () => {
	// 	count++;
	// 	io.emit("countUpdated", count);
	// });
	socket.on("join", ({ username, room }, callback) => {
		let { error, user } = addUser({ id: socket.id, username, room });
		if (error) {
			return callback(error);
		}
		socket.join(user.room);
		socket.emit("message", generateMessage("Admin", "Welcome!"));
		socket.broadcast
			.to(user.room)
			.emit(
				"message",
				generateMessage("Admin", `${user.username} has joined!`)
			);
		io.to(user.room).emit("roomData", {
			room: user.room,
			users: getUsersInRoom(user.room),
		});
	});
	socket.on("message", (msg, callback) => {
		let user = getUser(socket.id);
		io.to(user.room).emit("message", generateMessage(user.username, msg));
		callback();
	});
	socket.on("sendLocation", ({ latitude, longitude }, callback) => {
		let user = getUser(socket.id);
		io.to(user.room).emit(
			"rcvLocation",
			generateLocationMessage(user.username, latitude, longitude)
		);
		callback();
	});
	socket.on("disconnect", () => {
		let user = removeUser(socket.id);

		if (user) {
			console.log(user);
			io.to(user.room).emit(
				"message",
				generateMessage("Admin", `${user.username} has left!`)
			);
			io.to(user.room).emit("roomData", {
				room: user.room,
				users: getUsersInRoom(user.room),
			});
		}
	});
});
server.listen(PORT, () => {
	console.log(`Listening on port ${PORT}.`);
});
