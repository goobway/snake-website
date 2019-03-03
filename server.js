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

    // Grab username and score from POST request (provided after user wins game)
    let user = request.query.user;
    let score = request.query.score;

    // Instantiate a new Score objects to save to mongodb (Score was defined above)
    let scoreDoc = new Score({
        _id: user,
        value: score
    });

    // Save the score to mongodb (find if any exist and update or create if does not exist already)
    Score.findOneAndUpdate(
        // Search on primary key "_id", this is the unique identifier for the data, here we use "user"
        { '_id': user },
        // Pass in the score object we just created as the data to upsert with
        scoreDoc,
        // Upsert is short-hand update or insert (update if exists, insert if not)
        { upsert: true },
        (err) => {
            if (err) throw err;
            // This callback will run after we've upserted the data into mongodb
            // Once we've done this, send a response back to the user
            console.log("Score Saved!");
            console.log(user + ": " + score);
            response.sendFile(path.join(__dirname, './static/play.html'));
        });
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