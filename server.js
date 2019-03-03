const express = require("express");
const path = require("path");
const server = express();
const mongoose = require('mongoose');

let db = null;
let scoreSchema = mongoose.Schema({
    _id: String,
    value: Number
});

// Create mongoose schema
let Score = mongoose.model('Score', scoreSchema);

// Connecting to MongoDB
mongoose.connect('mongodb://mongo:27017/snakegame',
        { useNewURLParser: true }
    )
    .then((database) => {
        console.log('MongoDB Connected');

        db = database;

        let testscore = new Score({
            _id: "Calista",
            value: 100
        });

        testscore.save((err => {
            if (err) throw err;

            console.log("Score Saved!");
        }));
    })
    .catch(err => console.log(err));

server.use(express.static("static"));

server.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, './static/homepage.html'));
});

// /play?user=Calista
server.get('/play', (request, response) => {
    let user = request.query.user;
    console.log(user);
    response.sendFile(path.join(__dirname, './static/play.html'));
});

// /play?user=calista&score=20
server.post('/play', (request, response) => {
    let user = request.query.user;
    let score = request.query.score;
    console.log(user + ": " + score);
    response.sendFile(path.join(__dirname, './static/play.html'));
});

// 1. user finishes snake game
// 2. POST request is sent through this server with the score and username
// /score?u=calista&s=10 (score will be in URL parameters OR body)
// 3. Sever gets
// server.post("/score", ...)
// You've acheived this point when you can print a username and a score
// 4. Add the username and score PAIR to a database
// Easiest database to start with is MongoDB

// A database is a big excel sheet
// col | username | score
// 0   | calista  | 10,000
// 1   | jacob    | 100

server.listen(3000, () => {
    console.log("Listening on http://localhost:3000/")
});