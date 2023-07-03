const { Friends, User } = require('../models');
//change all applications to friends
module.exports = {
    // Function to get all of the applications by invoking the find() method with no arguments.
    // Then we return the results as JSON, and catch any errors. Errors are sent as JSON with a message and a 500 status code
    async getFriends(req, res) {
        try {
            const friends = await Friends.find();
            res.json(friends);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Gets a single application using the findOneAndUpdate method. We pass in the ID of the application and then respond with it, or an error if not found
    async getSingleFriend(req, res) {
        try {
            const friends = await Friends.findOne({ _id: req.params.friendsId });

            if (!friends) {
                return res.status(404).json({ message: 'No friend with that ID' });
            }

            res.json(friends);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Creates a new application. Accepts a request body with the entire Application object.
    // Because applications are associated with Users, we then update the User who created the app and add the ID of the application to the applications array
    async createFriends(req, res) { //might need to change this syntax
        try {
            const friends = await Friends.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { friends: friends._id } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({
                    message: 'Friend created, but found no user with that ID',
                })
            }

            res.json('Created the friend 🎉');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Updates and application using the findOneAndUpdate method. Uses the ID, and the $set operator in mongodb to inject the request body. Enforces validation.
    async updateFriends(req, res) {
        try {
            const friends = await Friends.findOneAndUpdate(
                { _id: req.params.friendsId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!friends) {
                return res.status(404).json({ message: 'No friends with this id!' });
            }

            res.json(friends);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Deletes an application from the database. Looks for an app by ID.
    // Then if the app exists, we look for any users associated with the app based on he app ID and update the applications array for the User.
    async deleteFriends(req, res) {
        try {
            const friends = await Friends.findOneAndRemove({ _id: req.params.friendsId });

            if (!friends) {
                return res.status(404).json({ message: 'No friends with this id!' });
            }

            const user = await User.findOneAndUpdate(
                { friends: req.params.friendsId },
                { $pull: { friends: req.params.friendsId } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({
                    message: 'Friend created but no user with this id!',
                });
            }

            res.json({ message: 'Friend successfully deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Adds a tag to an application. This method is unique in that we add the entire body of the tag rather than the ID with the mongodb $addToSet operator.
    async addTag(req, res) {
        try {
            const friends = await Friends.findOneAndUpdate(
                { _id: req.params.friendsId },
                { $addToSet: { tags: req.body } },
                { runValidators: true, new: true }
            );

            if (!friends) {
                return res.status(404).json({ message: 'No friends with this id!' });
            }

            res.json(friends);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Remove application tag. This method finds the application based on ID. It then updates the tags array associated with the app in question by removing it's tagId from the tags array.
    async removeTag(req, res) {
        try {
            const friends = await Friends.findOneAndUpdate(
                { _id: req.params.friendsId },
                { $pull: { tags: { tagId: req.params.tagId } } },
                { runValidators: true, new: true }
            );

            if (!friends) {
                return res.status(404).json({ message: 'No friends with this id!' });
            }

            res.json(friends);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};