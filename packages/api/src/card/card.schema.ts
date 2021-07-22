import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Deck } from 'src/deck/deck.schema';
import { Storage } from 'src/storage/storage.schema';
import { User } from 'src/user/user.schema';

export type CardDocument = Card & Document;

export type LinkMarker =
  | 'Top'
  | 'Top-Left'
  | 'Left'
  | 'Bottom-Left'
  | 'Bottom'
  | 'Bottom-Right'
  | 'Right'
  | 'Top-Right';

export type Attribute = 'LIGHT' | 'DARK' | 'FIRE' | 'WATER' | 'EARTH' | 'WIND';

export type Language =
  | 'en'
  | 'sp'
  | 'it'
  | 'fr'
  | 'de'
  | 'jp'
  | 'kr'
  | 'zh'
  | 'pt';

@Schema()
@ObjectType()
export class Card {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true })
  @Field(() => Int)
  card_id: number;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ required: true })
  @Field()
  archetype: string;

  @Prop()
  @Field(() => String, { nullable: true })
  attribute: Attribute;

  @Prop({ required: true })
  @Field()
  desc: string;

  @Prop({ required: true })
  @Field()
  type: string;

  @Prop({ required: true })
  @Field()
  race: string;

  @Prop()
  @Field(() => Int, { nullable: true })
  atk: number;

  @Prop()
  @Field(() => Int, { nullable: true })
  def: number;

  @Prop()
  @Field(() => Int, { nullable: true })
  level: number;

  @Prop()
  @Field(() => Int, { nullable: true })
  link_val: number;

  @Prop()
  @Field(() => [String], { nullable: true })
  link_markers: LinkMarker[];

  @Prop()
  @Field(() => Int, { nullable: true })
  scale: number;

  @Prop({ required: true })
  @Field()
  image: string;

  @Prop({ required: true })
  @Field()
  set: string;

  @Prop({ required: true })
  @Field(() => String)
  language: Language;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Storage' })
  @Field(() => Storage)
  storage: Storage | string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  @Field(() => User)
  owner: User | string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Deck' })
  @Field(() => Deck, { nullable: true })
  deck: Deck | string;

  @Prop()
  @Field(() => Int, { nullable: true })
  quantity_in_deck: number;

  @Prop({ required: true })
  @Field(() => Int)
  quantity: number;
}

export const CardSchema = SchemaFactory.createForClass(Card);

CardSchema.index({ owner: 1 });

@InputType()
export class CreateCardInput {
  @Field()
  card_id: number;

  @Field()
  name: string;

  @Field()
  archetype: string;

  @Field(() => String, { nullable: true })
  attribute: Attribute;

  @Field()
  desc: string;

  @Field()
  type: string;

  @Field()
  race: string;

  @Field(() => Int, { nullable: true })
  atk: number;

  @Field(() => Int, { nullable: true })
  def: number;

  @Field(() => Int, { nullable: true })
  level: number;

  @Field(() => Int, { nullable: true })
  link_val: number | undefined;

  @Field(() => [String], { nullable: true })
  link_markers: LinkMarker[];

  @Field(() => Int, { nullable: true })
  scale: number;

  @Field()
  image: string;

  @Field()
  set: string;

  @Field(() => String)
  language: Language;

  @Field(() => String)
  storage: string;

  @Field(() => String)
  owner: string;

  @Field(() => Int)
  quantity: number;
}

@InputType()
export class FindCardInput {
  @Field(() => ID)
  id: string;
}
