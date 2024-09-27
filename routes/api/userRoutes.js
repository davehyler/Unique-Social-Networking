// Use express' built-in router function
const router = require('express').Router();
// CRUD Functions (see Module 18, units12-14)
const 
{
    createUser,
    getUsers,
    getSingleUser,
    deleteUser,
    updateUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController.js');
// Create user
router.route('/').get(getUsers).post(createUser);
// Run operations on a single user by ID
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);
// Run operations on a users friend's ID
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;