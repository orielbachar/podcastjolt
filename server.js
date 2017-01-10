var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var request = require('request');
var http = require('http');
var twilio = require('twilio');
// var cheerio = require('cheerio');

mongoose.connect('mongodb://localhost/rereddit');

var app = express();
var client = require('./make_call');

app.use(express.static('public'))
app.use(express.static('node_modules'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//Create server
// Returns TwiML which prompts the caller to record a message
app.post('/record', (request, response) => {
  // Use the Twilio Node.js SDK to build an XML response
  let twiml = new twilio.TwimlResponse();
  twiml.say('Hello. Please leave a message after the beep.');

  // Use <Record> to record the caller's message
  twiml.record();

  // End the call with <Hangup>
  twiml.hangup();

  // Render the response as XML in reply to the webhook request
  response.type('text/xml');
  response.send(twiml.toString());
});

// Create an HTTP server and listen for requests on port 3000
app.listen(1337);


console.log('TwiML servin\' server running at http://127.0.0.1:1337/');




// var port = process.env.PORT || '3000';
//
// app.listen(port);
