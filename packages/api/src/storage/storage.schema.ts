import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Card } from 'src/card/card.schema';
import { User } from 'src/user/user.schema';

export type StorageDocument = Storage & Document;

export type StorageType = 'Binder' | 'Box' | 'Loose';

@Schema()
@ObjectType()
export class Storage {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ required: true })
  @Field(() => String)
  type: StorageType;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  @Field(() => User)
  owner: User | string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Card' })
  @Field(() => [Card], { nullable: true })
  cards: Card[];
}

export const StorageSchema = SchemaFactory.createForClass(Storage);
StorageSchema.index({ owner: 1 });

@InputType()
export class CreateStorageInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  type: StorageType;

  @Field(() => String)
  owner: string;
}
