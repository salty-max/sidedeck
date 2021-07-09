import { Module } from '@nestjs/common';
import { CardService } from 'src/card/card.service';
import { UserService } from 'src/user/user.service';
import { StorageResolver } from './storage.resolver';
import { StorageService } from './storage.service';

@Module({
  providers: [StorageResolver, StorageService, CardService, UserService],
})
export class StorageModule {}
