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
var Group = require('./models/Groups');

var expressJWT = require('express-jwt');
var auth = expressJWT({secret: 'myLittleSecret'});


//-----Records an incoming call ------
// Returns TwiML which prompts the caller to record a message
app.post('/record', function(request, response){

  // Use the Twilio Node.js SDK to build an XML response
  var twiml = new twilio.TwimlResponse();
  twiml.say('What problems did you have today? Are you on target?',{
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

//calls notification everyday at 8 o'clock. Checks every minute what time it is
setInterval(function(){ // Set interval for checking
    var date = new Date(); 
    if(date.getHours() === 8 && date.getMinutes() === 0){ 
        notification();
    }
}, 60000); 

//this func calls sendSms sending the users as an argument 
function notification(){
User.find(function(err, users){
                if(err){ return next(err)}
                users.forEach(function(user){
                 sendSms(user);
             })
          });
        }
// Completes the notification function by sending a link to the users with the recordings of previous day
function sendSms(user){
  var userNumber = user.phoneNum.replace("0","+972");
  var nameFirst = user.nameFirst;
  nameFirst = nameFirst.charAt(0).toUpperCase() + nameFirst.slice(1);
client.sendMessage({

    to: userNumber,  // Any number Twilio can deliver to
    from: '+17073362989', // A number you bought from Twilio and can use for outbound communication
    body: 'Good Morning ' + nameFirst + ',' + ' Listen to recordings here: https://podcastjolt.herokuapp.com/#/home' // body of the SMS message

}, function(err, responseData) { //this function is executed when a response is received from Twilio

    if (!err) { // "err" is an error received during the request, if any

        // "responseData" is a JavaScript object containing data received from Twilio.
        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
        // http://www.twilio.com/docs/api/rest/sending-sms#example-1

        console.log(responseData.from); 
        console.log(responseData.body); 
    }
});
};

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
              retriveRec(call, userFound); 
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
            user: user,
            listenUsers: [],
            link: recording.uri,
            callSid: recording.callSid
          }
    var newRecording = new Recording(recData);
     newRecording.save(function(err, newRecording){
      if(newRecording){
        User.findById(user._id, function (err, user) { 
        user.daySums.push(newRecording)
        user.save(function(err, savedUser){
          if(savedUser){console.log("user saved")};
          if(err){console.log(err)}
        })
      }) 
        console.log("recorded and saved to db")
      }
      if(err){ console.log(err)}
      
      });
  	});
  });
};

//gets all recordings for a range of dates. Default request is yesterday's and today's date
app.get('/recordings/:from/:to/:group', auth, function(req, res, next) {
    Recording.find({"dateCreated": {
      "$gte": new Date(req.params.from),
      "$lt": new Date(req.params.to)}}).populate('user')
      .exec(function(err, recordings){
        if(err){ return next(err)}
        if (req.params.group === "All"){
          res.json(recordings);
        } else {
          let relevantRecordings = [];
          recordings.forEach(function(recording){
            if (recording.user[0].Group[0]==req.params.group) {
              relevantRecordings.push(recording);
            }
          })
          res.json(relevantRecordings);
        }
      })
});
//       })
//         var relevantRecordings = [];
//         recordings.forEach(function(recording){
//           if (recording.user.Group[0]==req.params.group){
//             relevantRecordings.push(recording);
//           }
//         })
//         res.json(relevantRecordings)})
//    }   
// });


app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'),function(){
  console.log('TwiML servin\' server running at', app.get('port'));
});




