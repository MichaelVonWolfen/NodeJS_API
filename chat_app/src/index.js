const { app, server, io } = require("./app");
const PORT = process.env.PORT || 3000;

var count = 0;
io.on("connection", (socket) => {
	console.log("New Websocket connection!");
	socket.emit("countUpdated", count);
	socket.on("incrementCounter", () => {
		count++;
		io.emit("countUpdated", count);
	});
});
server.listen(PORT, () => {
	console.log(`Listening on port ${PORT}.`);
});
