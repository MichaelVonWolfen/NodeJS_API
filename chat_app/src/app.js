const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

module.exports = { app, server, io };
