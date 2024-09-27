// See Module 11 for further usage of Router Imports
const router = require('express').Router();
// Import our own routes
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');
// Use userRoutes for users and thoughtRoutes for thoughts
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
module.exports = router;