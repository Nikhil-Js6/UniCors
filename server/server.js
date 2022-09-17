const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const { readdirSync } = require('fs');
const Conversation = require('./models/Conversation');
require('dotenv').config();

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
    cors: {
        origin: process.env.CLIENT_REQ_URL,
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-type'],
    },
});

// Middlewares:
app.use(express.json({ limit: '5mb' }));
app.use(cors({ origin: [process.env.CLIENT_REQ_URL] }));
app.use(morgan('dev'));

// Database:
mongoose.connect(process.env.CLOUD_DATABASE_URL || process.env.LOCAL_DATABASE_URL);

mongoose.connection.on('connected', () => {
    console.log("Database Connected \u{1F525}");
});

// Autoload routes:
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));

// Socket.io:
io.on('connect', (socket) => {
    socket.on('send-message', async (sender, text) => {
        const conversation = await Conversation.find({
            members: { $in : [sender] }
        });
        console.log(conversation);
        // socket.to(sender).emit('get-message', text)
        socket.broadcast.emit('get-message', text);
    });
});

io.on('connect', (socket) => {
    socket.on('new-post', (newPost) => {
        socket.broadcast.emit('new-post', newPost);
    });
});

io.on('connect', (socket) => {
    socket.on('post-deleted', (deletedPost) => {
        socket.broadcast.emit('post-deleted', deletedPost);
    });
});

let port = process.env.PORT || 3300;

http.listen(port, console.log(`Server Started on port: ${port} \u{1F525}\u{1F680}`));
