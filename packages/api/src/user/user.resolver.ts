import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Card } from 'src/card/card.schema';
import { CardService } from 'src/card/card.service';
import { Storage } from 'src/storage/storage.schema';
import { StorageService } from 'src/storage/storage.service';
import { CreateUserInput, User } from './user.schema';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private cardService: CardService,
    private storageService: StorageService,
  ) {}

  @Query(() => [User])
  async users() {
    return this.userService.findMany();
  }

  @Mutation(() => User)
  async createUser(@Args('input') user: CreateUserInput) {
    return this.userService.createUser(user);
  }

  @ResolveField(() => [Card])
  async cards(@Parent() user: User) {
    return this.cardService.findByOwnerId(user._id);
  }

  @ResolveField(() => [Storage])
  async storages(@Parent() user: User) {
    return this.storageService.findByOwnerId(user._id);
  }
}
