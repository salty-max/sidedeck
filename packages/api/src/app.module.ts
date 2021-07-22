import { get, set } from 'lodash';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardModule } from './card/card.module';
import { DeckModule } from './deck/deck.module';
import { UserModule } from './user/user.module';
import { StorageModule } from './storage/storage.module';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { decode } from './utils/jwt.utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.0cck2.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
    ),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }) => {
        const publicKey = process.env.RSA_PUBLIC_KEY;

        // Get token from request
        const token = get(req, 'cookies.token');
        console.log({ token });

        const user = token
          ? decode(get(req, 'cookies.token'), publicKey)
          : null;

        if (user) {
          set(req, 'user', user);
        }

        return { req, res };
      },
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
