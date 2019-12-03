const express = require('express');
const postsRouter = require('../router/postsRouter');
const server = express();

server.get('/', (req, res) => {
    res.send('It\'s working!!');
});

server.use('/api/posts', postsRouter);

module.exports = server;