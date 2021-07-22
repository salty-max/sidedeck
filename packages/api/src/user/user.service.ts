import { omit } from 'lodash';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import Ctx from 'src/types/context.type.js';
import { signJwt } from '../utils/jwt.utils.js';
import {
  ConfirmUserInput,
  CreateUserInput,
  LoginInput,
  User,
  UserDocument,
} from './user.schema.js';
import { CookieOptions } from 'express';

const cookieOptions: CookieOptions = {
  domain: 'localhost',
  secure: false, // Set to true for production
  sameSite: 'strict',
  httpOnly: true,
  path: '/',
};

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findMany() {
    return this.userModel.find().lean();
  }

  async findById(id) {
    return this.userModel.findById(id);
  }

  async createUser(input: CreateUserInput) {
    const confirmToken = nanoid(32);
    return this.userModel.create({ ...input, confirmToken });
  }

  async confirmUser({ email, confirmToken }: ConfirmUserInput) {
    // find out user
    const user = await this.userModel.findOne({ email });

    // check if user exists and token is correct
    if (!user || confirmToken !== user.confirmToken) {
      throw new Error('User does not exist or confirmation token is incorrect');
    }

    user.active = true;

    await user.save();

    return user;
  }

  async login({ email, password }: LoginInput, ctx: Ctx) {
    const user = await this.userModel
      .findOne({ email })
      .select('-__v -confirmToken');

    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid email or password');
    }
    if (!user.active) {
      throw new Error('Please confirm your email address');
    }

    const privateKey = process.env.RSA_PRIVATE_KEY;

    const jwt = signJwt(
      omit(user.toJSON(), ['password', 'active']),
      privateKey,
    );

    ctx.res.cookie('token', jwt, cookieOptions);

    return user;
  }

  async logout(ctx: Ctx) {
    ctx.res.cookie('token', '', { ...cookieOptions, maxAge: 0 });
    return null;
  }
}
