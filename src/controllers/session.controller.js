const SessionSchema = require('./../models/session');
const path = require('path');

class SessionController {

    static async postSession(tk, un) {
        const session = new SessionSchema(tk, un);
        try {
            await session.save();
            return session;
        } catch (error) {
            return error;
        }
    };

    static async getSessionByToken(tkn) {
        try {
            const session = await SessionSchema.findOne({ token: tkn });
            return session;
        } catch (err) {
            return err;
        }
    }

}

module.exports = SessionController;