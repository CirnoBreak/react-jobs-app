import {
  Controller,
  Get,
  Post,
  Body,
  Response,
  HttpStatus,
  Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './users.decorator';

// 查询的时候过滤密码跟__v字段
const filter = ["pwd", "__v", "salt"];

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * 获取用户信息
   * @param {String} _id decode jwt token后得到的_id
   */
  @Get('/info')
  async getInfo (@User('_id') _id: string, @Response() response) {
    if (!_id) {
      return response
        .json({ msg: '没有权限', status: HttpStatus.UNAUTHORIZED });
    }
    const info = await this.usersService.findOne({ _id }, filter);
    if (info) {
      return response
        .json({ data: info, status: HttpStatus.OK })
    }
  }

  /**
   * 登录
   * @param {Object} loginUserDto 用户登录时填写的信息
   */
  @Post('/login')
  async login (@Body() loginUserDto: LoginUserDto, @Response() response) {
    const { user, pwd } = loginUserDto;
    // 从数据库获取当前用户的信息
    const res = await this.usersService.findOne({ user });
    // 判断当前密码与bcrypt加密过的密码是否一致
    const isPwdCorrect = this.usersService.comparePwd(pwd, res.pwd);
    // 筛选从后台读取的数据的敏感字段得到新的数据返回给前端
    const data = this.usersService.filterKey(res, filter);
    // 生成jwt
    const token = await this.usersService.generateJWT(res);
    if (!isPwdCorrect) {
      return response
        .json({ msg: '用户名或者密码错误' })
    }
    return response
        .json({ msg: '登陆成功', token, data, status: HttpStatus.OK })
  }

  /**
   * 注册
   * @param {Object} createUserDto 用户注册时填写的信息
   */
  @Post('/reg')
  async createUser (@Body() createUserDto: CreateUserDto, @Response() response) {
    const { user, pwd } = createUserDto;
    // 从数据库获取是否存在用户名一致的用户，用于判断用户名是否重复
    const res = await this.usersService.findOne({ user })
    if (res) {
      return response
        .json({ msg: '用户名重复' })
    }
    // 对密码进行bcrypt加密
    const hashPwd = this.usersService.cryptPwd(pwd);
    // 处理用户信息，把加密过的密码替换掉明文密码
    const userInfo = { ...createUserDto, pwd: hashPwd };
    return this.usersService.create(userInfo)
      .then(() => {
        response
          .json({ msg: "注册成功", status: HttpStatus.OK });
      })
  }

  /**
   * 完善信息
   * @param {String} _id decode jwt token后得到的_id
   * @param {Object} createUserDto 用户要修改的信息
   */
  @Patch('/improveinfo')
  async updateUser (@User('_id') _id: string, @Body() createUserDto: CreateUserDto, @Response() response): Promise<any> {
    if (!_id) {
      return response
        .json({ msg: "请求失败" });
    }
    return this.usersService.findOneAndUpdate(_id, createUserDto)
      .then((res) => {
        const { user, type } = res;
        const data = Object.assign({}, {
          user,
          type
        }, createUserDto);
        return response
          .json({ msg: "完善信息成功", ...data });
      })
  }
}
