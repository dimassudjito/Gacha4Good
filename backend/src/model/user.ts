import { DocumentType, getModelForClass, mongoose, prop, Ref } from "@typegoose/typegoose";
import { UserInputError } from "apollo-server";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { Authorized, Field, ID, ObjectType } from "type-graphql";
import { BoxingCard } from "./game";

@ObjectType()
export class CardInventory {
    @Field()
    public card: BoxingCard;

    @Field()
    public count: number;
}

@ObjectType()
export class User {
    @Authorized()
    @Field(() => ID)
    public _id!: mongoose.Types.ObjectId;

    @Authorized()
    @Field()
    @prop({ required: true })
    public username!: string;

    @prop({ required: true })
    public password!: string;

    @Authorized()
    @Field()
    @prop({ required: true })
    public balance: number = 0;

    @Authorized()
    @Field(() => [CardInventory])
    @prop({ ref: () => BoxingCard })
    public inventory?: Map<Ref<BoxingCard>, number>;

    public static async findByPassword(
        username: string,
        password: string
    ): Promise<DocumentType<User>> {
        const user = await UserModel.findOne({ username: username });
        if (await compare(password, user.password)) {
            return user;
        }
        throw new UserInputError("Incorrect username or password");
    }

    public static async generateToken(user: DocumentType<User>): Promise<string> {
        return sign(user._id, process.env.SECRET_KEY);
    }

    public addCard(newCard: Ref<BoxingCard>) {
        if (!this.inventory) {
            this.inventory = new Map<Ref<BoxingCard>, number>();
        }
        const existingCount = this.inventory.get(newCard);
        if (existingCount) {
            this.inventory.set(newCard, existingCount + 1);
        } else {
            this.inventory.set(newCard, 1);
        }
    }
}

export const UserModel = getModelForClass(User);
