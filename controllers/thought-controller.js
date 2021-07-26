const { User, Thought } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
                .populate({ 
                path: 'reactions',
                select: { _id: false, __v: false } 
                })
                .select('-__v')
                .sort({ _id: -1})
                .then(dbUserData => res.json(dbUserData))
                .catch(err => {
                    console.log(err);
                    res.status(500).json(err);
                });
    },

    createThought({ body }, res) {
        Thought.create(body)
            .then(dbThoughtData => {
                return User.findOneAndUpdate(
                    { _id: body.userId},
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true }
                )
            })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'no thought found for that user'});
                    return;
                }
                res.json({ message: 'Thought successfully created' });
            })
            .catch(err => res.status(400).json(err));
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: { _id: false, __v: false }
            })
            .populate({
                path: 'thoughtText',
                path: 'createdAt',
                path: 'username',
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id :(' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(404).json(err);
            })
    },

    updateThought({ params, body }, res) {
        Thought.findByIdAndUpdate(
            { _id: params.id },
            { $set: body },
            {
                runValidators: true,
                new: true
            }
        )
        .then(updateThought => {
            if (!updateThought) {
                res.status(404).json({ message: 'No thought found with this id :(' });
                return;
            }
            res.json(updateThought);
        })
        .catch(err => res.status(500).json(err));
    },

    deleteThought({ params }, res){
        Thought.findByIdAndDelete({ _id: params.id })
        .then(deleteThought => {
            if (!deleteThought) {
                res.status(404).json({ message: 'No thought found with this id :(' });
                return;
            }
            res.json(deleteThought);
        })
        .catch(err => res.status(500).json(err));
    },

    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought found with this id :(' });
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { runValidators: true, new: true }
        )
        .populate({
            path: 'reactions',
            select: { __v: false, _id: false }
        })
        .select('-__v')
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id :(' });
                return;
            }
            return res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    }

}

module.exports = thoughtController;