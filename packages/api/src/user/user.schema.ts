import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Card } from 'src/card/card.schema';
import { Deck } from 'src/deck/deck.schema';
import { Storage } from 'src/storage/storage.schema';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => [Card])
  cards: Card[];

  @Field(() => [Deck])
  decks: Deck[];

  @Field(() => [Storage])
  storages: Storage[];
}

export class CreateUserInput {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
