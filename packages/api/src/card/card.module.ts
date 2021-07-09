import { Module } from '@nestjs/common';
import { DeckService } from 'src/deck/deck.service';
import { StorageService } from 'src/storage/storage.service';
import { UserService } from 'src/user/user.service';
import { CardResolver } from './card.resolver';
import { CardService } from './card.service';

@Module({
  providers: [
    CardResolver,
    CardService,
    UserService,
    StorageService,
    DeckService,
  ],
})
export class CardModule {}
