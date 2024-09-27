
// Import Express' router functions and our api folder
const router = require('express').Router();
const apiRoutes = require('./api');
// See Module 18 unit 21-22 for more info on routes/virtuals
router.use('/api', apiRoutes);
router.use((req, res) => { return res.send('Wrong route!'); });

module.exports = router;