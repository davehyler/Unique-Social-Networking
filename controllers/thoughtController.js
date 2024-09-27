// Import from models' file
const { Thought, User } = require('../models');

module.exports = {
    // Return ALL thoughts in DB
    // See module 18 units 10-MiniProject for try, catch, and err usage.
    async getThoughts(req, res) 
    {
        try 
        {
            const thoughts = await Thought.find();
            res.status(200).json(thoughts);
        } 
        catch (err) 
        {
            res.status(500).json(err);
        }
    },
    // Use the built in "findOne" to pull a single thought by ID
    async getSingleThought(req, res) 
    {
        try 
        {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            if (!thought) 
            {
                return res.status(404).json({ message: 'Sorry, we cannot find that thought, please try another ID' });
            }
            res.json(thought);
        } 
        catch (err) 
        {
            res.status(500).json(err);
        }
    },
    // Publish a new thought 
    async createThought(req, res) 
    {
        try 
        {
            //See module 14 for ".create" and usage within req.body
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true });
            if (!user) 
            {
                return res.status(404).json({ message: 'User not found' })
            }
            res.json(thought);
        } catch (err) 
        {
            res.status(500).json(err)
        }
    },
    // Update existing thought
    async updateThought(req, res) 
    {
        try 
        {
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true });
          if (!thought) 
          {
            return res.status(404).json({ message: "Thought not found. Check ID and search again." });
          }
          res.json(thought);
        } 
        catch (err) 
        {
          res.status(500).json(err);
        }
      },

    // Delete thought
    async deleteThought(req, res) 
    {
        try 
        {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if (!thought) 
            {
                return res.status(404).json({ message: 'Thought not found. Check ID and search again.' });
            }
            res.json({ message: 'Thought has been deleted' });
        } 
        catch (err) 
        {
            res.status(500).json(err);
        }
    },
    // Add a reaction to a thought
    async addReaction(req, res) 
    {
        try 
        {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { new: true });
            if (!thought) 
            {
                return res.status(404).json({ message: 'Thought not found. Check ID and search again.' });
            }
            const updateThought = await Thought.findById(req.params.thoughtId);
            res.json(updateThought);
        } 
        catch (err) 
        {
            res.status(500).json(err);
        }
    },
   // Remove a reaction to a thought
    async removeReaction(req, res) 
    {
        try 
        {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } });
            if (!thought) 
            {
                return res.status(404).json({ message: 'Thought not found. Check ID and search again.' });
            }
            const updateThought = await Thought.findById(req.params.thoughtId);
            res.status(200).json(updateThought);
        } 
        catch (err) 
        {
            res.status(500).json(err);
        }
    },
};