//Import Connection + Paramaters from MongoDB (see Module 18 Activities 21-22 for more information on how to use below)
const { connect, connection } = require('mongoose');
connect('mongodb://127.0.0.1:27017/uniqueSocialNetwork');

module.exports = connection;
