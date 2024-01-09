var express = require('express');
var bodyParser = require("body-parser");
var app = express();
const logger = require('./logger');

const PORT = process.env.PORT || 5050
var startPage = "index.html";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));

const statusMonitor = require('express-status-monitor');
app.use(statusMonitor());

const { register, login } = require('./utils/UserUtil')
app.post('/register', register);
app.post('/login', login);

const { viewResources, addResource, editResource, deleteResource } = require('./utils/ResourceUtil')
app.get('/view-resources', viewResources);
app.post('/add-resource', addResource);
app.put('/edit-resource/:id', editResource);
app.delete('/delete-resource/:id', deleteResource);

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/" + startPage);
})

const server = app.listen(PORT, function () {
    console.log(`Demo project at: ${PORT}!`);
    logger.info(`Demo project at: ${PORT}!`);
    logger.error(`Example or error log`)
});

module.exports = { app, server }