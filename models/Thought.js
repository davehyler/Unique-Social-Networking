// Import mongoose and reaction
const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Thought Schema
const thoughtSchema = new Schema(
    {
        thoughtText: 
        {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 442,
        },
        createdAt: 
        {
            type: Date,
            default: Date.now,
            // Get date
            get: function (createdAt) 
            {
                return new Date(createdAt).toLocaleString();
            },
        },
        username: 
        {
            type: String,
            required: true,
            ref: 'user',
        },
        //Two references. First reaction is the array, second is the document we have imported
        reactions: [Reaction], 
    },
    {
        toJSON: 
        {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);
// Use length of reaction array as counter
thoughtSchema.virtual("reactionCount").get(function() 
{
    return this.reactions.length;
});

// Create the model using mongoose
const Thought = model('thought', thoughtSchema);

module.exports = Thought;