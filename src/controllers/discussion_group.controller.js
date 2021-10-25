const DGSchema = require('../models/discussion_group');
const path = require('path');

class DGController {

    static async postGroup(body) {
        console.log(body);
        const group = new DGSchema(body);
        try {
            await group.save();
            return group;
        } catch (error) {
            return error;
        }
    };

    static async getGroupByTitle(t) {
        try {
            const group = await DGSchema.findOne({ title: t });
            return group;
        } catch (err) {
            return err;
        }
    }

    static async addUser(u, group) {
        try {
            const gp = await DGSchema.updateOne(
                { title: group },
                { $set: { users: u } }
            );
            console.log('gp: ', gp);
            return gp;
        } catch (err) {
            return err;
        }
    }

    static async getMessages(t) {
        try {
            let messages = await DGSchema.findOne({ title: t });
            messages = messages.messages
            return messages;
        } catch (err) {
            return err;
        }
    }

    static async postMessages(m, group) {
        console.log('m: ', group);
        try {
            const gp = await DGSchema.updateOne(
                { title: group },
                { $set: { messages: m } }
            );
            return gp;
        } catch (err) {
            return err;
        }
    }

}

module.exports = DGController;