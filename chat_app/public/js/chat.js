var socket = io();

socket.on("general_msg", (msg) => {
	console.log(msg);
});
const autoscroll = () => {
	//New message element
	let $newMessage = $messages.lastElementChild;
	//height of the new message
	let newMessageStyles = getComputedStyle($newMessage);
	let newMessageMargin = parseInt(newMessageStyles.marginBottom);
	let newmessageHeight = $newMessage.offsetHeight + newMessageMargin;
	//visible height
	let vissibleHeight = $messages.offsetHeight;
	//height of message container
	let containerHeight = $messages.scrollHeight;

	//How far have I scrolled
	let scrollOffset = $messages.scrollTop + vissibleHeight;

	if (containerHeight - newmessageHeight <= scrollOffset) {
		$messages.scrollTop = $messages.scrollHeight;
	}
};
const $messageForm = document.querySelector("#message_form");
const $messageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("button");
const $locationButton = document.querySelector("#send_location");
const $messages = document.querySelector("#messages");

const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationTemplate = document.querySelector("#location-template").innerHTML;
const sidebarTemplate = document.querySelector("#sidebar-template").innerHTML;

const { username, room } = Qs.parse(location.search, {
	ignoreQueryPrefix: true,
});
document.addEventListener("DOMContentLoaded", () => {
	$messageForm.addEventListener("submit", (e) => {
		e.preventDefault();
		$messageFormButton.setAttribute("disabled", "disabled");
		let message = e.target.elements.message_field.value;
		socket.emit("message", message, (error) => {
			$messageFormButton.removeAttribute("disabled");
			if (error) return console.log(error);
			else console.log("Message sent succesfully!");
			$messageFormInput.value = "";
		});
		// message_field.value = "";
	});
});
socket.on("message", (msg) => {
	let html = Mustache.render(messageTemplate, {
		username: msg.username,
		message: msg.text,
		CreatedAt: moment(msg.createdAt).format("HH:mm"),
	});
	$messages.insertAdjacentHTML("beforeend", html);
	autoscroll();
});
socket.on("rcvLocation", (msg) => {
	let html = Mustache.render(locationTemplate, {
		username: msg.username,
		url: msg.url,
		CreatedAt: moment(msg.createdAt).format("HH:mm"),
	});
	$messages.insertAdjacentHTML("beforeend", html);
});
$locationButton.addEventListener("click", () => {
	if (!navigator.geolocation) {
		return alert("Your browser does not dupport geolocation");
	}
	$locationButton.setAttribute("disabled", "disabled");
	navigator.geolocation.getCurrentPosition((position) => {
		socket.emit(
			"sendLocation",
			{
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			},
			(error) => {
				$locationButton.removeAttribute("disabled");
				if (error) return console.log(error);
				else console.log("Location shared succesfully!");
			}
		);
	});
});
socket.on("roomData", ({ room, users }) => {
	let html = Mustache.render(sidebarTemplate, {
		room,
		users,
	});
	document.querySelector("#sidebar").innerHTML = html;
});
socket.emit("join", { username, room }, (error) => {
	if (error) {
		alert(error);
		location.href = "/";
	}
});
