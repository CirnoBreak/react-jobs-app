import { Controller, Get, Post, Body, Response, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

// 查询的时候过滤密码跟__v字段
const filter = {
  "pwd": 0,
  "__v": 0
};

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 登录
  @Post('/login')
  async login (@Body() createUserDto: CreateUserDto, @Response() response) {
    const { user, pwd } = createUserDto;
    this.usersService.findOne({ user, pwd }, filter)
      .then((res) => {
        if (!res) {
          return response
            .status(HttpStatus.BAD_GATEWAY)
            .json({ msg: '用户或者密码错误' })
        }
        console.log(res)
        return response
          .status(HttpStatus.OK)
          .json({ msg: '登陆成功', status: HttpStatus.OK })
      })
      .catch((err) => {
        if (err) {
          console.log('err', err)
        }
      })
  }

  // 注册
  @Post('/reg')
  async createUser (@Body() createUserDto: CreateUserDto, @Response() response) {
    const { user } = createUserDto;
    this.usersService.findOne({ user })
      .then((res) => {
        if (res) {
          return response
            .status(HttpStatus.BAD_GATEWAY)
            .json({ msg: '用户名重复' })
        }
        return this.usersService.create(createUserDto)
          .then(() => {
            response.json({ msg: "注册成功" });
          })
          .catch((err) => {
            if (err) {
              response.status(HttpStatus.BAD_REQUEST).json({
                msg: err.message
              });
            }
          });
      })
  }

}
