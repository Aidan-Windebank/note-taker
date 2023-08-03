// Packages for server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;
const html = require("./routes/html");
const api = require("./routes/api")
app.use(express.static('public'));

// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", api );
app.use("/", html);

// unique id generator
const uuid = require('./helpers/uuid');

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
