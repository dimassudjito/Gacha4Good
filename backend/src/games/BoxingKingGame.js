import mongoose from "mongoose";
import { Game, GameRoom } from "../models/Game.js";

export const BOXING_GAME_ID = "BoxingKing";

const boxingKingGameAction = new mongoose.Schema({
    timestamp: Date,
    player: { type: Schema.Types.ObjectId, ref: "User" },
    action: {
        type: String,
        enum: ["ROCK", "PAPER", "SCISSORS"],
    },
});

const boxingKingCardSchema = new mongoose.Schema({
    name: String,
    healthPoints: Number,
    attackPower: Number,
    cardPicture: String,
    headPicture: String,
});

const boxingKingCardPackSchema = new mongoose.Schema({
    name: String,
    price: Number,
    content: [{ card: { type: Schema.Types.ObjectId, ref: "Game.cards" }, chance: Number }],
});

const boxingKingSchema = new mongoose.Schema({
    cards: [boxingKingCardSchema],
    shop: [boxingKingCardPackSchema],
});

const boxingKingGameRoomSchema = new mongoose.Schema({
    actions: [boxingKingGameAction],
});

class BoxingKingGameRoomClass {
    static async NewRoom(creatorPlayer) {
        const newRoom = this.createOne({
            players: [creatorPlayer],
            actions: [],
        });

        return newRoom;
    }

    AddPlayer(joinerPlayer) {
        this.players.push(joinerPlayer);
        this.save();
    }

    AddAction(player, action) {
        this.actions.push({
            player: player,
            action: action,
        });
        this.save();
    }
}

boxingKingGameRoomSchema.loadClass(BoxingKingGameRoomClass);

export const BoxingKingGame = Game.discriminator("BoxingKing", boxingKingSchema);
export const BoxingKingGameRoom = GameRoom.discriminator(BOXING_GAME_ID, boxingKingGameRoomSchema);
