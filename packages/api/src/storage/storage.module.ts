import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from 'src/card/card.schema';
import { CardService } from 'src/card/card.service';
import { User, UserSchema } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { StorageResolver } from './storage.resolver';
import { Storage, StorageSchema } from './storage.schema';
import { StorageService } from './storage.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Card.name, schema: CardSchema },
      { name: User.name, schema: UserSchema },
      { name: Storage.name, schema: StorageSchema },
    ]),
  ],
  providers: [StorageResolver, StorageService, CardService, UserService],
})
export class StorageModule {}
