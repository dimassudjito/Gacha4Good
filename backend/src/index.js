import mongoose from "mongoose";
import { User } from "./models/User.js";

function main() {
    mongoose.connect(
        "mongodb+srv://gacha4good:verygood@cluster0.bpxxb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );

    User.CreateUser("testuser1", "asdf");

    const user = User.LogIn("testuser1", "asdf");
}

main();
