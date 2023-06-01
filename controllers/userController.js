const User = require('../models/User');

module.exports = {
  // get all users
  async getAllUsers(req, res) {
    try {
      const dbUserData = await User.find({});
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  // get one user by id
  async getUserById(req, res) {
    try {
      const dbUserData = await User.findOne({ _id: req.params.id });
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  // create user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // update user by id
  async updateUser(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.id }, 
        req.body, 
        { new: true, runValidators: true }
      );
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // delete user
  async deleteUser(req, res) {
    try {
      const dbUserData = await User.findOneAndDelete({ _id: req.params.id });
      res.json(dbUserData);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // add friend 
  async addFriend(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId } },
        { new: true }
      );
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    } catch (err) {
      res.json(err);
    }
  },

  // remove friend
  async removeFriend(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      res.json(dbUserData);
    } catch (err) {
      res.json(err);
    }
  }
};