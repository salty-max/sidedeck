import {
  Args,
  Context,
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
import Ctx from 'src/types/context.type';
import {
  ConfirmUserInput,
  CreateUserInput,
  LoginInput,
  User,
} from './user.schema';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private cardService: CardService,
    private storageService: StorageService,
  ) {}

  @Query(() => [User])
  async users() {
    return this.userService.findMany();
  }

  @Mutation(() => User)
  async registerUser(@Args('input') input: CreateUserInput) {
    return this.userService.createUser(input);
  }

  @Mutation(() => User)
  async confirmUser(@Args('input') input: ConfirmUserInput) {
    return this.userService.confirmUser(input);
  }

  @Query(() => User, { nullable: true })
  async login(@Args('input') input: LoginInput, @Context() ctx: Ctx) {
    return this.userService.login(input, ctx);
  }

  @Query(() => User, { nullable: true })
  async logout(@Context() ctx: Ctx) {
    return this.userService.logout(ctx);
  }

  @Query(() => User, { nullable: true })
  async me(@Context() ctx: Ctx) {
    return ctx.req.user;
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
