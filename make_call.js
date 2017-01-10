
// Download the Node helper library from twilio.com/docs/node/install
// These vars are your accountSid and authToken from twilio.com/user/account
var accountSid = 'ACe175fbe84cb43b81742d9e9516c751af';
var authToken = "fce5bbd7a29d1f57c19c4463b7694a03";
var client = require('twilio')(accountSid, authToken);

client.calls.create({
    url: "http://demo.twilio.com/docs/voice.xml",
    to: "+972544470404",
    from: "+17073362989",
    record: true
}, function(err, call) {
    process.stdout.write(call.sid);
});


//
//
// // Load the twilio module
// var twilio = require('twilio');
//
// // Create a new REST API client to make authenticated requests against the
// // twilio back end
// var client = new twilio.RestClient('ACe175fbe84cb43b81742d9e9516c751af', 'fce5bbd7a29d1f57c19c4463b7694a03');
//
// // Pass in parameters to the REST API using an object literal notation. The
// // REST client will handle authentication and response serialzation for you.
// client.sms.messages.create({
//     to:'+972547820831',
//     from:'+17073362989',
//     body:'ahoy hoy! Testing Twilio and node.js'
// }, function(error, message) {
//     // The HTTP request to Twilio will run asynchronously. This callback
//     // function will be called when a response is received from Twilio
//     // The "error" variable will contain error information, if any.
//     // If the request was successful, this value will be "falsy"
//     if (!error) {
//         // The second argument to the callback will contain the information
//         // sent back by Twilio for the request. In this case, it is the
//         // information about the text messsage you just sent:
//         console.log('Success! The SID for this SMS message is:');
//         console.log(message.sid);
//
//         console.log('Message sent on:');
//         console.log(message.dateCreated);
//     } else {
//         console.log('Oops! There was an error.');
//     }
// });

module.exports = client;
