var socket = io();

socket.on("general_msg", (msg) => {
	console.log(msg);
});
const $messageForm = document.querySelector("#message_form");
const $messageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("button");
const $locationButton = document.querySelector("#send_location");
const $messages = document.querySelector("#messages");

const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationTemplate = document.querySelector("#location-template").innerHTML;

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
		message: msg.text,
		CreatedAt: moment(msg.createdAt).format("HH:mm"),
	});
	$messages.insertAdjacentHTML("beforeend", html);
});
socket.on("rcvLocation", (msg) => {
	let html = Mustache.render(locationTemplate, {
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
