import { Module } from '@nestjs/common';
import { DeckResolver } from './deck.resolver';
import { DeckService } from './deck.service';

@Module({
  providers: [DeckResolver, DeckService],
})
export class DeckModule {}
