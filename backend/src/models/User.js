import mongoose from "mongoose";

const schema = new mongoose.Schema({
    username: String,
    password: String,
    balance: Number,
});

class UserClass {
    static CreateUser(username, password) {
        const newUser = new User({ username: username, password: password, balance: 100 });

        newUser.save();
    }

    static async LogIn(username, password) {
        try {
            const foundUser = await User.findOne({ username: username, password: password }).exec();

            return foundUser;
        } catch (ex) {
            console.log(`Error: ${ex} while in LogIn function.`);
        }
    }
}

schema.loadClass(UserClass);
export const User = mongoose.model("User", schema);
