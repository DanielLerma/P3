const UserSchema = require('./../models/user');
const path = require('path');

class UsersController {

    static async getAllUsers() {
        const users = await UserSchema.find({});
        try {
            return users;
        } catch (err) {
            return err;
        }
    }

    static async createUser(body) {

        const user = new UserSchema(body);

        try {
            await user.save();
            return user;
        } catch (error) {
            return error;
            // response.status(500).send(error);
        }
    };

    static async getUserByEmail(e) {
        const user = await UserSchema.findOne({ email: e });
        try {
            return user;
        } catch (err) {
            return err;
        }
    }

    static async getUserByUserName(uN) {
        const user = await UserSchema.findOne({ userName: uN });
        try {
            return user;
        } catch (err) {
            return err;
        }
    }

}

module.exports = UsersController;