import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
    {
        name: String,
        gameId: Number,
    },
    { discriminatorKey: "name" }
);

export const Game = mongoose.model("Game", gameSchema);

const gameRoomSchema = new mongoose.Schema({
    startTime: Date,
    endTime: Date,
    players: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

// class GameRoomClass {
//     get liveGames() {}

//     get archivedGames() {}
// }

export const GameRoom = mongoose.model("GameRoom", gameRoomSchema);
