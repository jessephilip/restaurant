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

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/waiting", function(req, res) {
  res.sendFile(path.join(__dirname, "waiting.html"));
});

// Search for specific entry - provides JSON
app.get("/api/:entries?", function (req, res) {
	var chosen = req.params.entries;

	if (chosen) {
		console.log(chosen);

		for (var i = 0; i < entries.length; i++) {
			if (chosen === entries[i].routeName) {
				res.json(entries[i]);
				return;
			}
		}

		res.json(false);
	} else {
		res.json(entry);
	}
});

// Create New Entry - takes in JSON input
app.post("/api/new", function (req, res) {
	// req.body hosts is equal to the JSON post sent from the user
	var newEntry = req.body;

	console.log(newEntry);

	// We then add the json the user sent to the character array
	entries.push(newEntry);

	// We then display the JSON to the users
	res.json(newEntry);
});

app.listen(PORT, function () {
	console.log("Currently listening on http://localhost:" + PORT);
});