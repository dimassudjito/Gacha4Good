import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
    {
        name: String,
    },
    { discriminatorKey: "name" }
);

export const Game = mongoose.model("Game", gameSchema);
