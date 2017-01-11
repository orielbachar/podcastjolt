var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var request = require('request');
var http = require('http');
var twilio = require('twilio');

mongoose.connect('mongodb://localhost/podcast');

var app = express();

// var client = require('./make_call');

app.use(express.static('public'))
app.use(express.static('node_modules'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// var routes = require('./routes/index');
// app.use('/', routes);

var Recording = require('./models/Recordings');
var User = require('./models/Users');


//-----Records an incoming call ------
// Returns TwiML which prompts the caller to record a message
app.post('/record', function(request, response){

  // Use the Twilio Node.js SDK to build an XML response
  var twiml = new twilio.TwimlResponse();
  twiml.say('Hello. Please leave a message after the beep.');

  // Use <Record> to record the caller's message
  twiml.record();

  // End the call with <Hangup>
  twiml.hangup();

  // Render the response as XML in reply to the webhook request
  response.type('text/xml');
  response.send(twiml.toString());
});

//-----Retrives all calls ------
 // Twilio Credentials
var accountSid = 'ACe175fbe84cb43b81742d9e9516c751af';
var authToken = 'fce5bbd7a29d1f57c19c4463b7694a03';

//Require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);


client.calls.list(function(err, data) {
    var calls = [];
    data.calls.forEach(function(call) {
        calls.push(call)
    });
     retriveRec(calls);
});

//Retrives recordings for a specific call
function retriveRec (calls){
  for (var i = 0; i < calls.length; i++) {
    //add phone number here to user
  client.calls(calls[i].sid).recordings.list({
  }, function(err, data) {
  	data.recordings.forEach(function(recording) {
          var recData = {
            dateCreated: recording.dateCreated,
            duration: recording.duration,
            user: {},
            listenUsers: [],
            link: recording.uri
          }
  	 console.log(recData);
  	});
  });
  }
};



// app.use(favicon(__dirname + '/public/img/favicon.ico'));

app.set('port', (process.env.PORT || 1337));
app.listen(app.get('port'),function(){
  console.log('TwiML servin\' server running at', app.get('port'));
});








// var port = process.env.PORT || '3000';
//
// app.listen(port);
