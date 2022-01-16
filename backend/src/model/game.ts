import { getModelForClass, mongoose, prop, Ref } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class BoxingCard {
    @Field(() => ID)
    @prop({ required: true })
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
    @Field()
    public card: BoxingCard;
    @Field()
    public rate: number;
}

export const BoxingCardModel = getModelForClass(BoxingCard);

@ObjectType()
export class BoxingCardPack {
    @Field(() => ID)
    @prop({ required: true })
    public _id!: mongoose.Types.ObjectId;

    @Field()
    @prop({ required: true })
    public name!: string;

    @Field()
    @prop({ required: true })
    public price!: number;

    @Field(() => BoxingCardRates)
    @prop({ required: true, ref: () => BoxingCard })
    public cards!: Map<Ref<BoxingCard>, number>;
}

export const BoxingCardPackModel = getModelForClass(BoxingCardPack);
