// Use express' built-in router function
const router = require('express').Router();
// CRUD Functions (see Module 18, units12-14)
const 
{
  createThought,
  getThoughts,
  getSingleThought,
  deleteThought,
  updateThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController.js');
// All thoughts
router.route('/').get(getThoughts).post(createThought); //Update: Changed function to single line, now working.
// Thoughts by ID
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);
// Create/Delete reaction(s) to a thought via ID
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;