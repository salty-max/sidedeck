import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardModule } from './card/card.module';
import { DeckModule } from './deck/deck.module';
import { UserModule } from './user/user.module';
import { StorageModule } from './storage/storage.module';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://root:root@cluster0.0cck2.mongodb.net/sidedeck_dev?retryWrites=true&w=majority',
    ),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    CardModule,
    DeckModule,
    UserModule,
    StorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
