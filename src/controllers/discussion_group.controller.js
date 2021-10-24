const DGSchema = require('../models/discussion_group');
const path = require('path');

class DGController {

    static async postGroup(body) {
        const group = new DGSchema(body);
        try {
            await group.save();
            return group;
        } catch (error) {
            return error;
        }
    };

}

module.exports = DGController;