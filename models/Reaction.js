const { Schema, Types } = require('mongoose');
const reactionSchema = new Schema(
  {
    reactionId: 
    {
      // See Module 18 unit 23
      type: Schema.Types.ObjectId,
      // See Module 18 unit 25 on operations for specific usage below within Schemas
      default: () => new Types.ObjectId(),
    },
    reactionBody: 
    {
      type: String,
      required: true,
      maxlength: 442,
    },
    username: 
    {
        type: String,
        required: true,
        ref: 'user',
    },
    createdAt: 
    {
      type: Date,
      default: Date.now,
      get: function (createdAt) 
      {
        return new Date(createdAt).toLocaleString();
      },
    },
  },
  {
    toJSON: 
    {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;