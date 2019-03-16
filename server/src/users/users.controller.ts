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

  @Get('/info')
  async getInfo (@User('_id') _id: string, @Response() response) {
    console.log(_id);
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

  // 登录
  @Post('/login')
  async login (@Body() loginUserDto: LoginUserDto, @Response() response) {
    const { user, pwd } = loginUserDto;
    const res = await this.usersService.findOne({ user });
    const isPwdCorrect = this.usersService.comparePwd(pwd, res.pwd);
    const data = this.usersService.filterKey(res, filter);
    const token = await this.usersService.generateJWT(res);
    console.log(data);
    if (!isPwdCorrect) {
      return response
        .status(HttpStatus.BAD_GATEWAY)
        .json({ msg: '用户名或者密码错误' })
    }
    return response
        .json({ msg: '登陆成功', token, data, status: HttpStatus.OK })
  }

  // 注册
  @Post('/reg')
  async createUser (@Body() createUserDto: CreateUserDto, @Response() response) {
    const { user, pwd } = createUserDto;
    const res = await this.usersService.findOne({ user })
    if (res) {
      return response
        .json({ msg: '用户名重复' })
    }
    const { salt, hashPwd } = this.usersService.cryptPwd(pwd);
    const userInfo = Object.assign({}, createUserDto, { salt, pwd: hashPwd });
    console.log(userInfo);
    return this.usersService.create(userInfo)
      .then(() => {
        response
          .status(HttpStatus.OK)
          .json({ msg: "注册成功" });
      })
  }

  @Patch('/improveinfo')
  async updateUser (@User('_id') _id: string, @Body() createUserDto: CreateUserDto, @Response() response): Promise<any> {
    if (!_id) {
      return response
        .status(HttpStatus.BAD_GATEWAY)
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
          .status(HttpStatus.OK)
          .json({ msg: "完善信息成功", ...data });
      })
  }
}
