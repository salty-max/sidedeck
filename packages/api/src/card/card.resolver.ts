import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { StorageService } from 'src/storage/storage.service';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { Card, CreateCardInput, FindCardInput } from './card.schema';
import { CardService } from './card.service';

@Resolver(() => Card)
export class CardResolver {
  constructor(
    private cardService: CardService,
    private userService: UserService,
    private storageService: StorageService,
  ) {}

  @Query(() => [Card])
  async cards() {
    return this.cardService.findMany();
  }

  @Query(() => Card)
  async card(@Args('input') { id }: FindCardInput) {
    return this.cardService.findById(id);
  }

  @Mutation(() => Card)
  async createCard(@Args('input') card: CreateCardInput) {
    return this.cardService.createCard(card);
  }

  @ResolveField(() => User)
  async owner(@Parent() card: Card) {
    return this.userService.findById(card.owner);
  }

  @ResolveField(() => Storage)
  async storage(@Parent() card: Card) {
    return this.storageService.findById(card.storage);
  }
}
