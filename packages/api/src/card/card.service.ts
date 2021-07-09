import { Injectable } from '@nestjs/common';
import { Card, CardDocument, CreateCardInput } from './card.schema';
import cards from '../data/cards.js';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CardService {
  cards: Partial<Card>[];

  constructor(@InjectModel(Card.name) private cardModel: Model<CardDocument>) {
    this.cards = cards;
  }

  async findMany() {
    return this.cardModel.find().lean();
  }

  async findById(id) {
    return this.cardModel.findById(id).lean();
  }

  async findByOwnerId(ownerId) {
    return this.cardModel.find({ owner: ownerId });
  }

  async findByStorageId(storageId) {
    return this.cardModel.find({ storage: storageId });
  }

  async findByDeckId(deckId) {
    return this.cardModel.find({ deck: deckId });
  }

  async createCard(card: CreateCardInput) {
    return this.cardModel.create(card);
  }
}
