import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interface/users.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { SECRET } from '../config';
import {
  hashSync,
  genSaltSync,
  compareSync
} from 'bcryptjs';
const jwt = require('jsonwebtoken');

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  
  /**
   * 寻找所有用户信息
   */
  async findAll (): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  /**
   * 寻找单个用户的信息
   * @param {Object} opt 查询单个用户的选项
   * @param {Object} filter 查询过程要过滤的字段
   */
  async findOne (opt: Object, filter: Object = {}): Promise<User | null> {
    return await this.userModel.findOne(opt, filter).exec();
  }

  /**
   * 创建用户(用于注册)
   * @param {Object} createUserDto 用户信息
   */
  async create (createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  /**
   * 修改单个用户信息
   * @param {Object} id 含有id的对象
   * @param {Object} createUserDto 要修改的用户信息
   */
  async findOneAndUpdate (id: Object, createUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.findOneAndUpdate(id, createUserDto);
  }

  /**
   * 
   * @param {Object} user 用户信息
   */
  public generateJWT (user: CreateUserDto) {
    return jwt.sign({
      _id: user._id,
      exp: Math.floor(Date.now() / 1000) + (60 * 60)
    }, SECRET)
  }

  /**
   * 对原密码进行bcrypt加盐加密
   * @param {String} pwd 原密码
   */
  public cryptPwd (pwd: string) {
    const salt = genSaltSync(2);
    const hashPwd = hashSync(pwd, salt);
    return hashPwd;
  }

  /**
   * 原密码与数据库加密密码对比，判断密码是否对的上
   * @param {String} pwd 原密码
   * @param {String} storePwd 数据库对应的密码
   */
  public comparePwd (pwd: string, storePwd: string) {
    const isPwdCorrect = compareSync(pwd, storePwd);
    return isPwdCorrect;
  }

  /**
   * 筛选数据敏感字段
   * @param {Object} obj 原始对象
   * @param {Array} filterKey 要过滤的key
   */
  public filterKey (obj: Object, filterKey: Object) {
    let newObj = JSON.parse(JSON.stringify(obj));
    Object.keys(filterKey).forEach((key) => {
      delete newObj[key];
    })
    return newObj;
  }
}
