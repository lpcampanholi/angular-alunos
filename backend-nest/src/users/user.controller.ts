import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/CreateUser.dto';

@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Get()
  findAll(): CreateUserDTO[] {
    return this.userRepository.listar();
  }

  @Post()
  createUser(@Body() user: CreateUserDTO) {
    this.userRepository.salvar(user);
    return user;
  }
}
