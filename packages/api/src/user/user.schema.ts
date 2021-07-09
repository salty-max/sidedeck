import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Card } from 'src/card/card.schema';
import { Deck } from 'src/deck/deck.schema';
import { Storage } from 'src/storage/storage.schema';

export type UserDocument = User & Document;

@Schema()
@ObjectType()
export class User {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ required: true })
  @Field()
  email: string;

  @Prop({ required: true })
  @Field()
  password: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Card' })
  @Field(() => [Card])
  cards: Card[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Deck' })
  @Field(() => [Deck])
  decks: Deck[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Storage' })
  @Field(() => [Storage])
  storages: Storage[];
}

export const UserSchema = SchemaFactory.createForClass(User);

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
