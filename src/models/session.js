const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema(
    {
        userName: { type: String, required: true },
        token: { type: String, required: true },
        isActive: { type: Number, required: true }
    },
    { collection: 'sessions' }
);

const sessionModel = mongoose.model('SessionSchema', SessionSchema);
module.exports = sessionModel;