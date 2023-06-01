const { Schema, model } = require("mongoose");
const ReactionSchema = require('./Reaction');
const dayjs = require('dayjs');

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: dayjs(),
    get: (somedate) => dayjs(somedate).format('MM/DD/YYYY')
  },
  username: {
    type: String,
    required: true
  },
  reactions: [ReactionSchema]
});

ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = mongoose.model('thought', thoughtSchema);

module.exports = Thought;
