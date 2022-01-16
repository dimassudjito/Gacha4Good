import { getModelForClass, mongoose, prop, Ref } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class BoxingCard {
    @Field(() => ID)
    public _id!: mongoose.Types.ObjectId;

    @Field()
    @prop({ required: true })
    public name!: string;

    @Field()
    @prop({ required: true })
    public healthPoints!: number;

    @Field()
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
    @Field()
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

    @Field()
    @prop({ required: true })
    public price!: number;

    @Field(() => [BoxingCardRates])
    @prop({ required: true })
    public cards!: Array<BoxingCardRates>;
}

export const BoxingCardPackModel = getModelForClass(BoxingCardPack);
