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

  async findOneAndUpdate (id: Object, createUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.findOneAndUpdate(id, createUserDto);
  }

  public generateJWT (user) {
    return jwt.sign({
      _id: user._id,
      exp: Math.floor(Date.now() / 1000) + (60 * 60)
    }, SECRET)
  }
}
