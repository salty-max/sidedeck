import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Card } from 'src/card/card.schema';
import { User } from 'src/user/user.schema';

@ObjectType()
export class Deck {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => [Card])
  main: Card[];

  @Field(() => [Card])
  extra: Card[];

  @Field(() => [Card])
  side: Card[];

  @Field(() => User)
  owner: User | number;
}

@InputType()
export class CreateDeckInput {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => [Card])
  main: Card[];

  @Field(() => [Card])
  extra: Card[];

  @Field(() => [Card])
  side: Card[];

  @Field(() => Int)
  owner: number;
}

@InputType()
export class FindDeckInput {
  @Field(() => ID)
  id: number;
}
