// import express
var express = require("express");
var app = express();

// import path
var path = require("path");

// import body-parser
var bodyParser = require("body-parser");

// var impor mysql
var sql = require("mysql");

// setup port for server
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
	type: "application/vnd.api+json"
}));

// array for reserved tables
var entries = [{
	name: "Jesse Matherne",
	phone: "1234567890",
	email: "jessephilip@gmail.com",
	unique: "jpm8857"
}, {
	name: "Randi Croft",
	phone: "0987654321",
	email: "rc@gmail.com",
	unique: "rmc4321"
}, {
	name: "Sheryl Matherne",
	phone: "5678901234",
	email: "kk@live.com",
	unique: "sbm1234"
}];

// array for waiting list
var waiting = [{
	name: "Larry Matherne",
	phone: "3456789012",
	email: "kk@live.com",
	unique: "lbm9012"
}];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/tables", function (req, res) {
	res.send(entries);
});

app.get("/api/waiting", function (req, res) {
	res.send(waiting);
});

app.get("/reserve", function (req, res) {
	res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/view", function (req, res) {
	res.sendFile(path.join(__dirname, "viewtables.html"));
});

app.get("/api", function (req, res) {
	res.send(entries);
});

app.get("/clear", function (req, res) {
	entries = {};
	console.log("cleared reservations");
});

// Search for specific entry - provides JSON
app.get("/api/:entries?", function (req, res) {
	var chosen = req.params.entries;
	chosen = chosen.toLowerCase()

	if (chosen) {
		console.log(chosen);

		for (var i = 0; i < entries.length; i++) {
			if (chosen === entries[i].name.toLowerCase()) {
				res.json(entries[i]);
				return;
			}
		}

		res.json(false);
	} else {
		res.json(entries);
	}
});

// Create New Entry - takes in JSON input
app.post("/api/new", function (req, res) {
	// req.body hosts is equal to the JSON post sent from the user
	var newEntry = req.body;

	console.log(newEntry);

	// We then add the json the user sent to the character array
	console.log(entries.length);
	if (entries.length > 4) waiting.push(newEntry);
	else entries.push(newEntry);

	// We then display the JSON to the users
	res.json(newEntry);
});

app.listen(PORT, function () {
	console.log("Currently listening on http://localhost:" + PORT);
});