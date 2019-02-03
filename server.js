const express = require("express");
const path = require("path");
const server = express();

server.use(express.static("static"));

// /play?user=Calista
server.get('/play', (request, response) => {
    let user = request.query.user;
    console.log(user);
    response.sendFile(path.join(__dirname, './static/play.html'));
});

server.listen(3000, () => {
    console.log("Listening on http://localhost:3000/")
});