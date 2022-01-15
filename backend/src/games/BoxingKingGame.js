import mongoose from "mongoose";
import { Game, GameRoom } from "../models/Game.js";

const GAME_ID = 1;

const boxingKingGameAction = new mongoose.Schema({
    timestamp: Date,
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

export const BoxingKingGame = Game.discriminator("BoxingKing", boxingKingSchema);
export const BoxingKingGameRoom = GameRoom.discriminator(GAME_ID, boxingKingGameRoomSchema);
