import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from 'src/card/card.schema';
import { CardService } from 'src/card/card.service';
import { Storage, StorageSchema } from 'src/storage/storage.schema';
import { StorageService } from 'src/storage/storage.service';
import { UserResolver } from './user.resolver';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Card.name, schema: CardSchema },
      { name: User.name, schema: UserSchema },
      { name: Storage.name, schema: StorageSchema },
    ]),
  ],
  providers: [UserResolver, UserService, CardService, StorageService],
})
export class UserModule {}
