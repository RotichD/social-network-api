const { User, Thought } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
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

    /*createReaction1({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            { $push: { reactions: body } }, //reac.create?
            { new: true, runValidators: true }
            )
            .then(thoughtReactionData => {
                if (!thoughtReactionData) {
                    res.status(404).json({ message: 'No thought found with this id :( '});
                    return;
                }
                res.json(thoughtReactionData);
            })
            .catch(err => res.status(500).json(err));
    },*/

    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
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

    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId} } },
            { runValidators: true, new: true }
        )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought found with this id :(' });
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    }

}

module.exports = thoughtController;