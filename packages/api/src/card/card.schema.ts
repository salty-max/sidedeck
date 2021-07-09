import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Deck } from 'src/deck/deck.schema';
import { Storage } from 'src/storage/storage.schema';
import { User } from 'src/user/user.schema';

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

@ObjectType()
export class Card {
  @Field(() => ID)
  id: number;

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
  linkval: number;

  @Field(() => [String], { nullable: true })
  linkmarkers: LinkMarker[];

  @Field(() => Int, { nullable: true })
  scale: number;

  @Field()
  image: string;

  @Field()
  set: string;

  @Field(() => String)
  language: Language;

  @Field(() => Storage)
  storage: Storage | number;

  @Field(() => User)
  owner: User | number;

  @Field(() => Deck, { nullable: true })
  deck: Deck | number;
}

@InputType()
export class CreateCardInput {
  @Field(() => ID)
  id: number;

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
  linkval: number | undefined;

  @Field(() => [String], { nullable: true })
  linkmarkers: LinkMarker[];

  @Field(() => Int, { nullable: true })
  scale: number;

  @Field()
  image: string;

  @Field()
  set: string;

  @Field(() => String)
  language: Language;

  @Field(() => Int)
  storage: number;

  @Field(() => Int)
  owner: number;
}

@InputType()
export class FindCardInput {
  @Field(() => ID)
  id: number;
}
