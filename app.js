const http = require("http");
const express = require("express");
const path = require('path');
const app = express();
const server = http.createServer(app);

const mongo = require('./server/mongo');
const {job} = require('./server/cron');

app.use('/server', express.static(__dirname + "/server"));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

mongo.connect();
server.listen(process.env.PORT || 4000, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});

job.start();


