import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './user';
import { UserRepository } from './user.repository';

@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Get()
  findAll(): User[] {
    return this.userRepository.listar();
  }

  @Post()
  createUser(@Body() user: User) {
    this.userRepository.salvar(user);
    return user;
  }
}
