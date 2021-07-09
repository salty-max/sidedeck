import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Card } from 'src/card/card.schema';
import { CardService } from 'src/card/card.service';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { Storage } from './storage.schema';
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

  @ResolveField(() => [Card])
  async cards(@Parent() storage: Storage) {
    return this.cardService.findByStorageId(storage.id);
  }

  @ResolveField(() => User)
  async owner(@Parent() card: Card) {
    return this.userService.findById(card.owner);
  }
}
