import { DocumentType, getModelForClass, mongoose, prop } from "@typegoose/typegoose";
import { UserInputError } from "apollo-server";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { Authorized, Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class User {
    @Authorized()
    @Field(() => ID)
    public _id!: mongoose.Types.ObjectId;

    @Authorized()
    @prop({ required: true })
    public username!: string;

    @prop({ required: true })
    public password!: string;

    @Authorized()
    @Field()
    @prop({ required: true })
    public balance: number = 0;

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
}

export const UserModel = getModelForClass(User);
