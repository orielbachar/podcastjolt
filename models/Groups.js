var mongoose = require('mongoose');

var GroupSchema = new mongoose.Schema({
  name: String,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
}); 

// Would we need any methods for this Schema....?
// 
// PostSchema.methods.upvote = function() {
//   this.upvotes += 1;
// };

var Group = mongoose.model('Group', GroupSchema);

module.exports = Group;