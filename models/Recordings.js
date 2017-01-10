var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  date: Date,
  recLength: Number,
  recUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  listenUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  link: String
});

// Would we need any methods for this Schema....?
// 
// PostSchema.methods.upvote = function() {
//   this.upvotes += 1;
// };

var Recording = mongoose.model('Post', PostSchema);

module.exports = Recording;