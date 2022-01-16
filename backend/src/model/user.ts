import { DocumentType, getModelForClass, mongoose, prop, Ref } from "@typegoose/typegoose";
import { UserInputError } from "apollo-server";
import { sign } from "jsonwebtoken";
import { Field, ID, ObjectType } from "type-graphql";
import { BoxingCard } from "./game";

@ObjectType()
export class User {
    @Field(() => ID)
    public _id!: mongoose.Types.ObjectId;

    @Field()
    @prop({ required: true })
    public username!: string;

    @prop({ required: true })
    public password!: string;

    @Field()
    @prop({ required: true })
    public balance: number = 0;

    @Field(() => [BoxingCard])
    @prop()
    public inventory?: Array<Ref<BoxingCard>>;

    public static async findByPassword(
        username: string,
        password: string
    ): Promise<DocumentType<User>> {
        const user = await UserModel.findOne({ username: username });
        if (!user) {
            throw new UserInputError("Incorrect username or password");
        }

        if (password === user.password) {
            return user;
        }
        throw new UserInputError("Incorrect username or password");
    }

    public static async generateToken(user: DocumentType<User>): Promise<string> {
        return sign({ _id: user._id }, process.env.SECRET_KEY);
    }

    public addCard(newCard: Ref<BoxingCard>) {
        if (!this.inventory) {
            this.inventory = [];
        }
        this.inventory.push(newCard);
    }
}

export const UserModel = getModelForClass(User);
