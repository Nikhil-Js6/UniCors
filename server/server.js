const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const { readdirSync } = require('fs');
require('dotenv').config();

const app = express();

app.use(express.json({ limit: '5mb' }));
app.use(cors({ origin: [process.env.CLIENT_REQ_URL] }));
app.use(morgan('dev'));

mongoose.connect(process.env.CLOUD_DATABASE_URL || process.env.LOCAL_DATABASE_URL);

mongoose.connection.on('connected', () => {
    console.log("Database Connected \u{1F525}");
});

readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));

let port = process.env.PORT || 3300;

app.listen(port, console.log(`Server Started on port: ${port} \u{1F525}\u{1F680}`));
