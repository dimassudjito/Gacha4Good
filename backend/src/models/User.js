import mongoose from "mongoose";

class UserClass {
    get username() {
        return this.username;
    }

    set balance(new_value) {
        this.balance = new_value;
    }

    get balance() {
        return this.balance;
    }

    // set inventory() {

    // }

    // get inventory() {
    //     return this.inventory
    // }

    static CreateUser(username, password) {
        const newUser = new User({ username: username, password: password, balance: 100 });

        newUser.save();
    }

    static LogIn(username, password) {
        return this.findOne({ username: username, password: password });
    }
}

const schema = new mongoose.Schema();
export const User = schema.loadClass(UserClass);
