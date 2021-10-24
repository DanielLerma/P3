const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        userName: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        pwd: { type: String, required: true }
    },
    { collection: 'users' }
);

const userModel = mongoose.model('UserSchema', UserSchema);
module.exports = userModel;