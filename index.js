// Import required files needed to connect to mongo and use express' router
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
// Environmental
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Connect to DB
db.once('open', () => 
{
  app.listen(PORT, () => 
  {
    console.log(`API listening on port ${PORT}!`);
  });
});