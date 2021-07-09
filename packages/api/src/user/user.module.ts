import { Module } from '@nestjs/common';
import { CardService } from 'src/card/card.service';
import { StorageService } from 'src/storage/storage.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  providers: [UserResolver, UserService, CardService, StorageService],
})
export class UserModule {}
