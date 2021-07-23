const { User } = require('../models');

const userController = {
    // gets all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path:'thoughts', // what about the friends?
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // gets one user by their id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'comments',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id :(' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(404).json(err);
            });
    },

    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    updateUser({ params, body }, res) {
        User.findByIdAndUpdate(
            { _id: params.id },
            { $set: body },
            {
                runValidators: true,
                new: true
            }
        )
            .then(updateUser => {
                if (!updateUser) {
                    res.status(404).json({ message: 'No user found with this id :(' });
                    return;
                }
                res.json(updateUser);
            })
            .catch(err => res.status(500).json(err));
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(deleteUser => {
                if (!deleteUser) {
                    res.status(404).json({ message: 'No user found with this id :(' });
                    return;
                }
                res.json(deleteUser);
            })
            .catch(err => res.status(500).json(err));
    }
}

module.exports = userController;