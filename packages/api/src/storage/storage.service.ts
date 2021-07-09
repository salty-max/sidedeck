import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStorageInput, Storage, StorageDocument } from './storage.schema';

@Injectable()
export class StorageService {
  constructor(
    @InjectModel(Storage.name) private storageModel: Model<StorageDocument>,
  ) {}

  async findMany() {
    return this.storageModel.find().lean();
  }

  async findById(id) {
    return this.storageModel.findById(id);
  }

  async findByOwnerId(ownerId) {
    return this.storageModel.find({ owner: ownerId });
  }

  async createStorage(storage: CreateStorageInput) {
    return this.storageModel.create(storage);
  }
}
