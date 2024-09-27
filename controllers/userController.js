// Import models into user and thought
const { User, Thought } = require('../models');

module.exports = {
  // Find ALL users
  async getUsers(req, res) 
  {
    try 
    {
      const users = await User.find();
      res.status(200).json(users);
    } 
    catch (err) 
    {
      res.status(500).json(err);
    }
  },
  // Find a specific user by ID
  async getSingleUser(req, res) 
  {
    try 
    {
      const user = await User.findOne({ _id: req.params.userId });
      if (!user) 
      {
        return res.status(404).json({ message: 'User ID not found' });
      }
      res.json(user);
    } 
    catch (err) 
    {
      res.status(500).json(err);
    }
  },
  // Create a new user
  async createUser(req, res) 
  {
    try 
    {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) 
    {
      res.status(500).json(err)
    }
  },
  // Update an existing user by ID
  async updateUser(req, res) 
  {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { new: true });
      if (!user) 
      {
        return res.status(404).json({ message: 'User ID not found' });
      }
      res.json(user);
    } catch (err) 
    {
      res.status(500).json(err);
    }
  },
  // Delete a user by ID
  async deleteUser(req, res) 
  {
    try 
    {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      if (!user) 
      {
        return res.status(404).json({ message: 'User ID not found' });
      }
      // This usage will need an additional function that was delete any thought IDs associated with that user ID.
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'User and all associated thoughts have been deleted' })
    } 
    catch (err) 
    {
      res.status(500).json(err);
    }
  },
  // Add a user ID to a friends list
  async addFriend(req, res) 
  {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.userId } },
      );
      if (!user) 
      {
        return res.status(404).json({ message: 'User ID not found' });
      }
      const updatedUser = await User.findById(req.params.userId);
      res.json(updatedUser);
    } 
    catch (err) 
    {
      res.status(500).json(err);
    }
  },
  // Remove a user from friends list by ID
  async deleteFriend(req, res) 
  {
    try 
    {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.userId } },);
        if (!user) 
        {
        return res.status(404).json({ message: 'User ID not found' });
        }
      const updatedUser = await User.findById(req.params.userId);
      res.json(updatedUser);
    } 
    catch (err) 
    {
      res.status(500).json(err);
    }
  },
};