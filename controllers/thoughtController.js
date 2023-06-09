const Thought = require("../models/Thought");
const User = require("../models/User");

module.exports = {
  // get all thoughts
  async getAllThoughts(req, res) {
    try {
      const dbThoughtData = await Thought.find({});
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  // get one thought by id
  async getThoughtById(req, res) {
    try {
      const dbThoughtData = await Thought.findOne({ _id: req.params.id });
      if (!dbThoughtData) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  // create thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { thoughts: thought._id } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "Username not found!" });
      }

      res.json({ thought, user });
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // update thought by id
  async updateThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );
      if (!dbThoughtData) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // delete thought
  async deleteThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndDelete({
        _id: req.params.id,
      });
      res.json(dbThoughtData);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // add reaction
  async addReaction(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true, runValidators: true }
      );
      if (!dbThoughtData) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      res.json(err);
    }
  },

  // remove reaction
  async removeReaction(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: {} } },
        { new: true }
      );
      res.json(dbThoughtData);
    } catch (err) {
      res.json(err);
    }
  },
};
