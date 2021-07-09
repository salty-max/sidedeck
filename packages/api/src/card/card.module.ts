import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeckService } from 'src/deck/deck.service';
import { Storage, StorageSchema } from 'src/storage/storage.schema';
import { StorageService } from 'src/storage/storage.service';
import { User, UserSchema } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { CardResolver } from './card.resolver';
import { Card, CardSchema } from './card.schema';
import { CardService } from './card.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Card.name, schema: CardSchema },
      { name: User.name, schema: UserSchema },
      { name: Storage.name, schema: StorageSchema },
    ]),
  ],
  providers: [
    CardResolver,
    CardService,
    UserService,
    StorageService,
    DeckService,
  ],
})
export class CardModule {}
