import { Controller, Get, Post, Body, Response, HttpStatus, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './users.decorator';

// 查询的时候过滤密码跟__v字段
const filter = {
  "pwd": 0,
  "__v": 0
};

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/info')
  async getInfo (@User('user') user: string, @Response() response) {
    if (!user) {
      return response
        .json({ msg: '没有权限', status: HttpStatus.UNAUTHORIZED });
    }
    const info = await this.usersService.findOne({ user }, filter);
    if (info) {
      console.log(info)
      return response
        .json({ data: info, status: HttpStatus.OK })
    }
  }

  // 登录
  @Post('/login')
  async login (@Body() loginUserDto: LoginUserDto, @Response() response) {
    const { user, pwd } = loginUserDto;
    const token = await this.usersService.generateJWT(loginUserDto);
    const res = await this.usersService.findOne({ user, pwd }, filter);
    if (!res) {
      return response
        .status(HttpStatus.BAD_GATEWAY)
        .json({ msg: '用户或者密码错误' })
    }
    return response
        .json({ msg: '登陆成功', token, data: res, status: HttpStatus.OK })
  }

  // 注册
  @Post('/reg')
  async createUser (@Body() createUserDto: CreateUserDto, @Response() response) {
    const { user } = createUserDto;
    const res = await this.usersService.findOne({ user })
    if (res) {
      return response
        .json({ msg: '用户名重复' })
    }
    return this.usersService.create(createUserDto)
      .then(() => {
        response.json({ msg: "注册成功" });
      })
  }
}
