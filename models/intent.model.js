const mongoose = require('mongoose');

const intentSchema = mongoose.Schema({
    tag: {
        type: String,
        required: true
    },
    patterns: {
        type: [String],
        required: true
    },
    responses: {
        type: [String],
        required: true
    },
    context_set: {
        type: String
    }
}, {
    timestamps: true
});

const Intent = mongoose.model('intent', intentSchema);

module.exports = { Intent }