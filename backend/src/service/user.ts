import { DocumentType } from "@typegoose/typegoose";
import { UserInputError } from "apollo-server-core";
import {
    Arg,
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
import { BoxingCard, BoxingCardModel } from "../model/game";
import { User, UserModel } from "../model/user";
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

        const newUser = new UserModel(user);
        await newUser.save();

        const token = await User.generateToken(newUser);
        TokenCache.set(token, newUser);

        return new AuthorizedUser(newUser, token);
    }

    @Mutation(() => User)
    async addBalance(@Arg("userId") userId: string, @Arg("value") value: number) {
        const user = await UserModel.findById(userId);

        user.balance += value;
        await user.save();
        return user;
    }

    @FieldResolver()
    async inventory(@Root() user: DocumentType<User>): Promise<Array<BoxingCard>> {
        if (!user.inventory) {
            return [];
        }

        const cardPromises = user.inventory.map((cardRef) => {
            return BoxingCardModel.findById(cardRef);
        });

        const resolvedCards = await Promise.all(cardPromises);

        return resolvedCards;
    }
}
