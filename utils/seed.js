// Connect to Mongoose
const connection = require('../config/connection');
// Import user model
const { User } = require('../models');

connection.on('error', (err) => err);
// Open and connect to database
connection.once('open', async () => 
{
    let thoughtDB = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtDB.length) 
    {
        await connection.dropCollection('thoughts');
    }
    let userDB = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userDB.length) 
    {
        await connection.dropCollection('users');
    }
    // User data to seed
    const users = [
        {
            username: "user1",
            email: "user1@email.com",
        },
        {
            username: "user2",
            email: "user2@email.com",
        },
        {
            username: "user3",
            email: "user3@email.com",
        },
        {
            username: "user4",
            email: "user4@email.com",
        },
        {
            username: "user5",
            email: "user5@email.com",
        },
        {
            username: "user6",
            email: "user6@email.com",
        },
    ];
    await User.insertMany(users);
    // Display table within console, provide confirmation of completed seed, then exit.
    console.table(users);
    console.timeEnd('Users Loaded. Process will now exit.');
    process.exit(0);
});