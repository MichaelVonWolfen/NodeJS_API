var socket = io();

socket.on("countUpdated", (msg) => {
	let h = document.getElementById("messsage");
	h.innerText = msg;
	console.log("The counter has been updated:", msg);
});
document.querySelector("#increment").addEventListener("click", () => {
	console.log("Clicked!");
	socket.emit("incrementCounter");
});
