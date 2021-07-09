import { Injectable } from '@nestjs/common';
import users from '../data/users.js';

@Injectable()
export class UserService {
  async findMany() {
    return users;
  }

  async findById(id) {
    const res = users.filter((user) => user.id === id);
    return res.length ? res[0] : null;
  }
}
