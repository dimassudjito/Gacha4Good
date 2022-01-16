import { DocumentType, Ref } from "@typegoose/typegoose";
import { ApolloError, UserInputError } from "apollo-server";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { BoxingCard, BoxingCardModel, BoxingCardPack, BoxingCardPackModel } from "../model/game";
import { AuthorizedContext } from "./auth";

const randBetween = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
};

@Resolver()
export class BoxingGameResolver {
    @Query()
    async packs(): Promise<Array<DocumentType<BoxingCardPack>>> {
        return await BoxingCardPackModel.find();
    }

    @Authorized()
    @Mutation()
    async buyPack(
        @Ctx() ctx: AuthorizedContext,
        @Arg("packId") packId: string
    ): Promise<DocumentType<BoxingCard>> {
        const cardPack = await BoxingCardPackModel.findById(packId);

        if (!cardPack) {
            throw new UserInputError("Invalid packId");
        }

        if (ctx.user.balance - cardPack.price < 0) {
            throw new UserInputError("Can't afford card");
        }

        const weights = Array.from(cardPack.cards.values());
        const cards = Array.from(cardPack.cards.keys());

        let sum = 0;
        const prefixSum = weights.map<number>((x) => (sum = sum + x));

        const value = randBetween(0, prefixSum.at(-1));
        const index = prefixSum.findIndex((arrayValue) => {
            return arrayValue > value;
        });

        let cardRef: Ref<BoxingCard>;

        if (index === -1) {
            cardRef = cards.at(index);
        } else if (index === 0) {
            cardRef = cards.at(0);
        } else {
            cardRef = cards.at(index - 1);
        }

        const card = await BoxingCardModel.findById(cardRef);

        if (!card) {
            throw new ApolloError("Card not found");
        }

        return card;
    }
}
