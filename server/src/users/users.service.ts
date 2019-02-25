import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interface/users.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { SECRET } from '../config';
const jwt = require('jsonwebtoken');

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  
  async findAll (): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne (opt: Object, filter: Object = {}): Promise<User | null> {
    return await this.userModel.findOne(opt, filter).exec();
  }

  async create (createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  public generateJWT (user) {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
      user: user.user,
      exp: exp.getTime() / 1000
    }, SECRET)
  }
}
