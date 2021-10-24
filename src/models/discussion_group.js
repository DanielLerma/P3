const mongoose = require('mongoose');

const DGSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        users: { type: Array, required: true },
        messages: { type: Array },
        dateAdded: { type: Date, required: true }
    },
    { collection: 'discussion_groups' }
);

const DGModel = mongoose.model('DGSchema', DGSchema);
module.exports = DGModel;