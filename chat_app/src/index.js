const { app, server, io } = require("./app");
const PORT = process.env.PORT || 3000;
const {
	generateMessage,
	generateLocationMessage,
} = require("./utils/messages");
io.on("connection", (socket) => {
	console.log("New Websocket connection!");
	// socket.emit("countUpdated", count);
	// socket.on("incrementCounter", () => {
	// 	count++;
	// 	io.emit("countUpdated", count);
	// });
	socket.emit("message", generateMessage("Welcome!"));
	socket.broadcast.emit("message", generateMessage("A new user has joined!"));
	socket.on("message", (msg, callback) => {
		io.emit("message", generateMessage(msg));
		callback();
	});
	socket.on("sendLocation", ({ latitude, longitude }, callback) => {
		io.emit("rcvLocation", generateLocationMessage(latitude, longitude));
		callback();
	});
	socket.on("disconnect", () => {
		io.emit("general_msg", generateMessage("An user has left!"));
	});
});
server.listen(PORT, () => {
	console.log(`Listening on port ${PORT}.`);
});
