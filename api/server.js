const express = require('express');
const postsRouter = require('../router/postsRouter');
const server = express();

server.get('/', (req, res) => {
    res.send('Project: node-api2-project is up and running!');
});

server.use('/api/posts', postsRouter);

module.exports = server;