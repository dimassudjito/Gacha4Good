import { Game } from "./Game.js";

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

export const BoxingKingGame = Game.discriminator("BoxingKing", boxingKingSchema);
