import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';

@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) { }

  @Get()
  async findAll(): Promise<CreateUserDTO[]> {
    return await this.userRepository.list();
  }

  @Post()
  async createUser(@Body() user: CreateUserDTO) {
    const userEntity: UserEntity = new UserEntity();
    userEntity.name = user.name;
    userEntity.email = user.email;
    userEntity.password = user.password;
    userEntity.id = uuid();
    await this.userRepository.save(userEntity);
    return { id: userEntity.id, message: 'User created successfully' };
  }
}
