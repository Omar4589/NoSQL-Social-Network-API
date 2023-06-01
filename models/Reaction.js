const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: () => dayjs().toDate(),
    get: (somedate) => {
      return dayjs(somedate).format("MM/DD/YYYY");
    },
  }
});

module.exports = reactionSchema;
