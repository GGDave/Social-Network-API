const { User, Thoughts } = require('../models');
//replace all applications with thoughts
module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find().populate('friends');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
       .populate('friends')  
       .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user and associated apps
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      await Application.deleteMany({ _id: { $in: user.applications } });
      res.json({ message: 'User and associated apps deleted!' })
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId }, // find a document with this id
        req.body, // document to insert when nothing was found
        {new: true, runValidators: true} // options: return updated one, validate before update
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId, // The id of the user to whom the friend will be added.
        { $addToSet: { friends: req.body.friendId } }, // The id of the friend to add.
        { new: true, runValidators: true } // Options: return the modified document rather than the original. runValidators ensures new friendId is a valid ObjectId.
      );
  
      if (!user) {
        return res.status(404).json({ message: 'No user with this ID' });
      }
  
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
