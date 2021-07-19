const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use(require("./routes/api.js"));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connected successfully');
})

app.listen(port, () => {
    console.log(`App running on port ${port}!`);
});