const { Schema, } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({
    reactionId: mongoose.ObjectId,
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp)
    }
},
{
    toJSON: {
        getters: true
    }
});

const Reaction = ('reactionSchema', ReactionSchema);

module.exports = Reaction;