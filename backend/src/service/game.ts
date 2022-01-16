import { DocumentType, Ref } from "@typegoose/typegoose";
import { ApolloError, UserInputError } from "apollo-server";
import {
    Arg,
    Authorized,
    Ctx,
    FieldResolver,
    Maybe,
    Mutation,
    Query,
    Resolver,
    Root,
} from "type-graphql";
import {
    BoxingCard,
    BoxingCardModel,
    BoxingCardPack,
    BoxingCardPackModel,
    BoxingCardRates,
} from "../model/game";
import { AuthorizedContext } from "./auth";

const randBetween = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
};

@Resolver(BoxingCardPack)
export class BoxingGameResolver {
    @Query(() => [BoxingCardPack])
    async packs(): Promise<Maybe<Array<BoxingCardPack>>> {
        return await BoxingCardPackModel.find();
    }

    @FieldResolver()
    async cards(@Root() pack: DocumentType<BoxingCardPack>): Promise<Array<BoxingCardRates>> {
        const cardRefs = Array.from(pack.cards.keys());
        const cardRates = Array.from(pack.cards.values());
        const cardPromises = cardRefs.map((cardRef) => {
            return BoxingCardModel.findById(cardRef);
        });

        const resolvedCards = await Promise.all(cardPromises);

        let outputArray = [];

        for (let i = 0; i < resolvedCards.length; i++) {
            outputArray.push({ card: resolvedCards[i], rate: cardRates[i] });
        }

        return outputArray;
    }

    @Authorized()
    @Mutation(() => BoxingCard)
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

        ctx.user.addCard(cardRef);

        const card = await BoxingCardModel.findById(cardRef);

        if (!card) {
            throw new ApolloError("Card not found");
        }

        return card;
    }
}
