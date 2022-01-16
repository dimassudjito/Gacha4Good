import { DocumentType } from "@typegoose/typegoose";
import { UserInputError } from "apollo-server-core";
import { hashSync } from "bcrypt";
import {
    Arg,
    Authorized,
    Ctx,
    Field,
    FieldResolver,
    InputType,
    Mutation,
    ObjectType,
    Query,
    Resolver,
    Root,
    UnauthorizedError,
} from "type-graphql";
import { BoxingCardModel } from "../model/game";
import { CardInventory, User, UserModel } from "../model/user";
import { AuthorizedContext, TokenCache } from "./auth";

@InputType()
class NewUserInput {
    @Field()
    username!: string;

    @Field()
    password!: string;

    balance: number = 10000;
}

@ObjectType()
class AuthorizedUser {
    @Field(() => User)
    public user!: User;

    @Field()
    public token!: string;

    constructor(user: User, token: string) {
        this.user = user;
        this.token = token;
    }
}

@Resolver(User)
export class UserResolver {
    @Query(() => User)
    async user(@Arg("id") id: string): Promise<DocumentType<User>> {
        const user = await UserModel.findById(id);

        if (!user) {
            throw new UserInputError("User not found");
        }

        return user;
    }

    @Authorized()
    @Mutation(() => Boolean)
    async logout(@Ctx() ctx: AuthorizedContext): Promise<boolean> {
        try {
            TokenCache.delete(ctx.token);
        } catch (ex) {
            console.log(ex);
            return false;
        }
        return true;
    }

    @Mutation(() => AuthorizedUser)
    async login(
        @Arg("username") username: string,
        @Arg("password") password: string
    ): Promise<AuthorizedUser> {
        try {
            const user = await UserModel.findByPassword(username, password);
            const token = await User.generateToken(user);

            TokenCache.set(token, user);
            return new AuthorizedUser(user, token);
        } catch (ex) {
            console.log(ex);
            throw new UnauthorizedError();
        }
    }

    @Mutation(() => AuthorizedUser)
    async newUser(@Arg("newUserData") user: NewUserInput): Promise<AuthorizedUser> {
        const existing = await UserModel.find({ username: user.username }).count();

        if (existing !== 0) {
            throw new UserInputError("Username in use");
        }

        user.password = hashSync(user.password, 10);

        const newUser = new UserModel(user);
        await newUser.save();

        const token = await User.generateToken(newUser);
        TokenCache.set(token, newUser);

        return new AuthorizedUser(newUser, token);
    }

    @Authorized()
    @Mutation(() => AuthorizedUser)
    async addBalance(@Ctx() ctx: AuthorizedContext, @Arg("value") value: number) {
        ctx.user.balance += value;
        await ctx.user.save();
        return new AuthorizedUser(ctx.user, ctx.token);
    }

    @Authorized()
    @Mutation(() => AuthorizedUser)
    async deleteCard(
        @Ctx() ctx: AuthorizedContext,
        @Arg("cardId") cardId: string,
        @Arg("count") count: number
    ) {
        const card = await BoxingCardModel.findById(cardId);
        if (ctx.user.inventory.has(card)) {
            const newCount = ctx.user.inventory.get(card) - count;
            ctx.user.inventory.set(card, newCount);
        }
        await ctx.user.save();
        return new AuthorizedUser(ctx.user, ctx.token);
    }

    @FieldResolver()
    async inventory(@Root() user: DocumentType<User>): Promise<Array<CardInventory>> {
        if (!user.inventory) {
            return [];
        }

        const cardRefs = Array.from(user.inventory.keys());
        const cardCounts = Array.from(user.inventory.values());
        const cardPromises = cardRefs.map((cardRef) => {
            return BoxingCardModel.findById(cardRef);
        });

        const resolvedCards = await Promise.all(cardPromises);

        let outputArray = [];

        for (let i = 0; i < resolvedCards.length; i++) {
            outputArray.push({ card: resolvedCards[i], rate: cardCounts[i] });
        }

        return outputArray;
    }
}
