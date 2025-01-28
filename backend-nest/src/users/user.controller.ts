import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';
import { ListUserDTO } from './dto/ListUser.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';

@Controller('users')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Get('/:id')
  async findOneUser(@Param('id') id: string) {
    const foundUser = await this.userRepository.findOne(id);
    return foundUser;
  }

  @Get()
  async findAll(): Promise<ListUserDTO[]> {
    const savedUsers = await this.userRepository.list();
    const usersList = savedUsers.map(
      (user) => new ListUserDTO(user.id, user.name),
    );
    return usersList;
  }

  @Post()
  async createUser(@Body() user: CreateUserDTO) {
    const userEntity: UserEntity = new UserEntity();
    userEntity.name = user.name;
    userEntity.email = user.email;
    userEntity.password = user.password;
    userEntity.id = uuid();
    await this.userRepository.save(userEntity);
    return {
      user: new ListUserDTO(userEntity.id, userEntity.name),
      message: 'User created successfully',
    };
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() newData: UpdateUserDTO) {
    const updatedUser = await this.userRepository.update(id, newData);
    return {
      user: updatedUser,
      message: 'User updated successfully',
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const deletedUser = await this.userRepository.delete(id);
    return {
      user: deletedUser,
      message: 'User deleted successfully',
    };
  }
}
