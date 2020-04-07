const http = require("http");
const express = require("express");
const path = require('path');
const app = express();
const server = http.createServer(app);

const mongo = require('./server/mongo');
const { job } = require('./server/cron');

mongo.connect();
server.listen(process.env.PORT || 4000, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});

job.start();


