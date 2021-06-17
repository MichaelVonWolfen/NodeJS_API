const generateMessage = (username, text) => {
	return {
		text,
		createdAt: new Date().getTime(),
		username,
	};
};
const generateLocationMessage = (username, latitude, longitude) => {
	return {
		username,
		url: `https://www.google.com/maps?q=${latitude},${longitude}`,
		createdAt: new Date().getTime(),
	};
};

module.exports = {
	generateMessage,
	generateLocationMessage,
};
