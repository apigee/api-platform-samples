// importing the dependencies
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const parser = require('xml2json');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

var meters = {};
var readings = {};

fs.readFile( './data/meter-data.xml', function(err, data) {
  var json = JSON.parse(parser.toJson(data));
  meters["Meters"] = json["Meters"]["Meter"];
});

fs.readFile( './data/reading-data.xml', function(err, data) {
  var json = JSON.parse(parser.toJson(data));
  readings["MeterReadings"] = json["MeterReadings"]["MeterReading"];
});

// defining an endpoint to return all meters
app.get('/meters', (req, res) => {
  res.send(meters);
});

app.get('/readings', (req, res) => {
  res.send(readings);
});

// starting the server
app.listen(8080, () => {
  console.log('listening on port 8080');
});
