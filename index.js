const express = require('express');
const {ConnectionDbs} = require('./db')
const app = express();
const dotenv = require("dotenv");
const cors = require('cors');
const weather = require("./router/weatherroute");

app.use(express.json());
dotenv.config();
app.use(cors());

app.use("/", weather);
ConnectionDbs()
const PORT = 5000 || process.env.PORT 

app.listen(PORT, () => console.log('Server running'));