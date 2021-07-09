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
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { CreateStorageInput, Storage } from './storage.schema';
import { StorageService } from './storage.service';

@Resolver(() => Storage)
export class StorageResolver {
  constructor(
    private storageService: StorageService,
    private cardService: CardService,
    private userService: UserService,
  ) {}

  @Query(() => [Storage])
  async storages() {
    return this.storageService.findMany();
  }

  @Mutation(() => Storage)
  async createStorage(@Args('input') storage: CreateStorageInput) {
    return this.storageService.createStorage(storage);
  }

  @ResolveField(() => [Card])
  async cards(@Parent() storage: Storage) {
    return this.cardService.findByStorageId(storage._id);
  }

  @ResolveField(() => User)
  async owner(@Parent() card: Card) {
    return this.userService.findById(card.owner);
  }
}
