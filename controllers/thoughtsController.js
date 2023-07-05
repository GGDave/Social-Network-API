const { Thoughts, User } = require('../models');

module.exports = {
  // Function to get all of the thoughts by invoking the find() method with no arguments.
  // Then we return the results as JSON, and catch any errors. Errors are sent as JSON with a message and a 500 status code
  async getThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Gets a single thought using the findOneAndUpdate method. We pass in the ID of the thought and then respond with it, or an error if not found
  async getSingleThought(req, res) {
    try {
      const thoughts = await Thoughts.findOne({ _id: req.params.thoughtsId });

      if (!thoughts) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Updates a thought using the findOneAndUpdate method. Uses the ID, and the $set operator in mongodb to inject the request body. Enforces validation.
  async updateThoughts(req, res) {
    try {
      const thoughts = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thoughts) {
        return res.status(404).json({ message: 'No thoughts with this id!' });
      }

      res.json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Deletes a thought from the database. Looks for a thought by ID.
  // Then if the thought exists, we look for any users associated with the thought based on he thought ID and update the thoughts array for the User.
  async deleteThoughts(req, res) {
    try {
      const thoughts = await Thoughts.findOneAndRemove({ _id: req.params.thoughtsId });

      if (!thoughts) {
        return res.status(404).json({ message: 'No thoughts with this id!' });
      }

      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtsId },
        { $pull: { thoughts: req.params.thoughtsId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought created but no user with this id!',
        });
      }

      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Adds a tag to a thought. This method is unique in that we add the entire body of the tag rather than the ID with the mongodb $addToSet operator.
  async addTag(req, res) {
    try {
      const thoughts = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $addToSet: { tags: req.body } },
        { runValidators: true, new: true }
      );

      if (!thoughts) {
        return res.status(404).json({ message: 'No thoughts with this id!' });
      }

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Removes thoughts tag. This method finds the thought based on ID. It then updates the tags array associated with the thought in question by removing it's tagId from the tags array.
  async removeTag(req, res) {
    try {
      const thoughts = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $pull: { tags: { tagId: req.params.tagId } } },
        { runValidators: true, new: true }
      );

      if (!thoughts) {
        return res.status(404).json({ message: 'No thoughts with this id!' });
      }

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createThoughts(req, res) {
    try {
      // Create a new Thought document
      const thoughts = await Thoughts.create(req.body);
  
      // Update a User document to include the new Thought's ID in the 'thoughts' array
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thoughts._id } },
        { new: true }
      );
  
      // If no user is found with the provided ID, send a 404 response
      if (!user) {
        return res.status(404).json({
          message: 'Thought created, but found no user with that ID',
        })
      }
  
      // If the user is found and updated, send a 200 response with the user and thought data
      res.status(200).json({ message: 'Created the thought 🎉', user, thoughts });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};
