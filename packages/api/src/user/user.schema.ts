import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HookNextFunction, Schema as MongooseSchema } from 'mongoose';
import * as bcrypt from 'bcrypt';
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

  @Prop({ required: true, unique: true })
  @Field()
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  confirmToken: string;

  @Prop({ required: true, default: false })
  active: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Card' })
  @Field(() => [Card])
  cards: Card[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Deck' })
  @Field(() => [Deck])
  decks: Deck[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Storage' })
  @Field(() => [Storage])
  storages: Storage[];

  comparePassword: (candidatePassword: string) => boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1 });

UserSchema.pre('save', async function (next: HookNextFunction) {
  const user = this as UserDocument;

  // only hash the password if it has been modified
  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hashSync(user.password, salt);

  // replace the password with the hash
  user.password = hash;

  return next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
) {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch(() => false);
};

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class ConfirmUserInput {
  @Field()
  email: string;

  @Field()
  confirmToken: string;
}

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
