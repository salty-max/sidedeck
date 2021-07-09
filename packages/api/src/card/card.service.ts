import { Injectable } from '@nestjs/common';
import { Card, CreateCardInput } from './card.schema';
import cards from '../data/cards.js';

@Injectable()
export class CardService {
  cards: Partial<Card>[];

  constructor() {
    this.cards = cards;
  }

  async findMany() {
    return this.cards;
  }

  async findById(id) {
    const res = this.cards.filter((card) => card.id === id);
    if (!res.length) return null;

    return res[0];
  }

  async findByOwnerId(ownerId) {
    return this.cards.filter((card) => card.owner === ownerId);
  }

  async findByStorageId(storageId) {
    return this.cards.filter((card) => card.storage === storageId);
  }

  async findByDeckId(deckId) {
    return this.cards.filter((card) => card.deck === deckId);
  }

  async createCard(card: CreateCardInput) {
    this.cards = [card, ...this.cards];
    return card;
  }
}
