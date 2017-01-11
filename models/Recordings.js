var mongoose = require('mongoose');

var RecordingsSchema = new mongoose.Schema({
  dateCreated: Date,
  duration: String,
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  listenUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  link: String
}); 

// Would we need any methods for this Schema....?
// 
// PostSchema.methods.upvote = function() {
//   this.upvotes += 1;
// };

var Recording = mongoose.model('Recording', RecordingsSchema);

module.exports = Recording;