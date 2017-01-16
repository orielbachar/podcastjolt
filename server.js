var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var request = require('request');
var http = require('http');
var twilio = require('twilio');
var passport = require('passport');


mongoose.connect(process.env.MONGOLAB_OLIVE_URI || 'mongodb://localhost/podcast');


var app = express();

// var client = require('./make_call');

app.use(express.static('public'))
app.use(express.static('node_modules'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var routes = require('./routes/index');
app.use('/', routes);

var Recording = require('./models/Recordings');
var User = require('./models/Users');

var expressJWT = require('express-jwt');
var auth = expressJWT({secret: 'myLittleSecret'});


//-----Records an incoming call ------
// Returns TwiML which prompts the caller to record a message
app.post('/record', function(request, response){

  // Use the Twilio Node.js SDK to build an XML response
  var twiml = new twilio.TwimlResponse();
  twiml.say('What was your biggest challenge during the hackathon? You have 10 seconds, after the beep!',{
    voice: 'woman'
  });

  // Use <Record> to record the caller's message
  twiml.record();

  // End the call with <Hangup>
  twiml.hangup();
  listCalls();
  // Render the response as XML in reply to the webhook request
  response.type('text/xml');
  response.send(twiml.toString());
});



 // Twilio Credentials
var accountSid = 'ACe175fbe84cb43b81742d9e9516c751af';
var authToken = 'fce5bbd7a29d1f57c19c4463b7694a03';
var client = require('twilio')(accountSid, authToken);

//-----Retrives all calls ------
function listCalls(){
client.calls.list(function(err, data) {

    data.calls.forEach(function(call) {
        Recording.findOne({callSid: call.sid}, function (err, callFound){
          if(!callFound){
    //format call.fromFormatted to become 054 instead of +972 change to 0. Check if phone number exits in User, then push call ID to that user.
          var phoneNum = call.fromFormatted.replace('+972', '0');
          User.findOne({phoneNum: phoneNum}, function(err, userFound){
            if(userFound){
              userFound.daySums.push(call.sid);
               userFound.save(function(err, userSaved){
                if(userSaved){
                  retriveRec(call, userSaved);
                  console.log("User saved to db")}
                if(err){ console.log(err);}
             });
            }
          })
          }
        })
      });
  });
};


//Retrives recordings for a specific call
function retriveRec (call, user){
    //add phone number here to user
  client.calls(call.sid).recordings.list({
  }, function(err, data) {
  	data.recordings.forEach(function(recording) {
          var recData = {
            dateCreated: recording.dateCreated,
            duration: recording.duration,
            user: [],
            listenUsers: [],
            link: recording.uri,
            callSid: recording.callSid
          }
    var newRecording = new Recording(recData);
     newRecording.save(function(err, newRecording){
      if(newRecording){console.log("recorded and saved to db")}
      if(err){ console.log(err);}
      });
      //Find new recording then push user ID to that record. (Push recording to user?)
      Recording.findOne({callSid: recording.callSid}, function(err, recordFound){
        recordFound.user.push(user._id);
      })
  	});
  });
};

app.get('/recordings', auth, function(req, res, next) {
  console.log(req.user);
Recording.find({"dateCreated": {
    "$gte": new Date("2017-01-13"), "$lt": new Date("2017-01-14")
}}, function(err, recordings){
    if(err){ return next(err); }

    res.json(recordings);
});
});


app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'),function(){
  console.log('TwiML servin\' server running at', app.get('port'));
});





// var port = process.env.PORT || '3000';
//
// app.listen(port);
