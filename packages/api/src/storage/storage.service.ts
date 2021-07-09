import { Injectable } from '@nestjs/common';
import storages from 'src/data/storages';
import { Storage } from './storage.schema';

@Injectable()
export class StorageService {
  storages: Storage[];

  constructor() {
    this.storages = storages;
  }

  async findMany() {
    return this.storages;
  }

  async findById(id) {
    const res = this.storages.filter((st) => st.id === id);

    return res.length ? res[0] : null;
  }

  async findByOwnerId(ownerId) {
    return this.storages.filter((storage) => storage.owner === ownerId);
  }
}
