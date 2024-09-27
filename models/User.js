// Extract the Schema and Types properties from the imported mongoose module
const { Schema, model } = require('mongoose');

// Schema for user data
const userSchema = new Schema(
    {
        username: 
        {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: 
        {
            type: String,
            required: true,
            unique: true,
        },
        // While the above will exist individually (and unique), the following will act as an array for each set of thoughts/friends
        thoughts: [
          {
              type: Schema.Types.ObjectId,
              ref: 'thought',
          }],
        friends: [
          {
              type: Schema.Types.ObjectId,
              ref: 'user',
          }],
    },
    {
        toJSON: 
        {
            virtuals: true,
        },
        id: false,
    }
);
// Use length of reaction array as counter
userSchema.virtual("friendCount").get(function() 
{
    return this.friends.length;
});

// Create the model using mongoose
const User = model('user', userSchema);

module.exports = User;