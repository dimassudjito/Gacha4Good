import { getModelForClass, mongoose, prop, Ref } from "@typegoose/typegoose";
import { Field, ID, Int, ObjectType } from "type-graphql";

@ObjectType()
export class BoxingCard {
    @Field(() => ID)
    public _id!: mongoose.Types.ObjectId;

    @Field()
    @prop({ required: true })
    public name!: string;

    @Field(() => Int)
    @prop({ required: true })
    public healthPoints!: number;

    @Field(() => Int)
    @prop({ required: true })
    public attackPower!: number;

    @Field()
    @prop({ required: true })
    public cardPicture!: string;

    @Field()
    @prop({ required: true })
    public headPicture!: string;
}

@ObjectType()
export class BoxingCardRates {
    @prop()
    @Field(() => ID)
    public card: Ref<BoxingCard>;

    @prop()
    @Field(() => Int)
    public rate: number;
}

export const BoxingCardModel = getModelForClass(BoxingCard);

@ObjectType()
export class BoxingCardPack {
    @Field(() => ID)
    public _id!: mongoose.Types.ObjectId;

    @Field()
    @prop({ required: true })
    public name!: string;

    @Field(() => Int)
    @prop({ required: true })
    public price!: number;

    @Field(() => [BoxingCard])
    @prop({ required: true })
    public cards!: Array<BoxingCardRates>;
}

export const BoxingCardPackModel = getModelForClass(BoxingCardPack);
