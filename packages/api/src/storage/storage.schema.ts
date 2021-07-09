import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.schema';

export type StorageType = 'Binder' | 'Box' | 'Loose';

@ObjectType()
export class Storage {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => String)
  type: StorageType;

  @Field(() => User)
  owner: User | number;
}

@InputType()
export class CreateStorageInput {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => String)
  type: StorageType;

  @Field(() => Int)
  owner: number;
}
