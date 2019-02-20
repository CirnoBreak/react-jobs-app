import { Controller, Get, Post, Body, Response } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll (@Response() res) {
    const users = this.usersService.findAll();
    console.log('users', users)
    return res.json(users)
  }

  @Post()
  async createUser (@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

}
