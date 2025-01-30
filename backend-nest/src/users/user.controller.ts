import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { ListUserDTO } from './dto/list-user-dto';
import { UpdateUserDTO } from './dto/update-user-dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:id')
  async findUserById(@Param('id') id: string): Promise<ListUserDTO> {
    const user = await this.userService.findOne(id);
    if (user) {
      return user;
    } else {
      throw new NotFoundException('User not found');
    }
  }

  @Get()
  async findAllUsers(): Promise<ListUserDTO[]> {
    const users = await this.userService.list();
    return users;
  }

  @Post()
  async createUser(@Body() user: CreateUserDTO) {
    const createdUser = await this.userService.create(user);
    return {
      user: createdUser,
      message: 'User created successfully',
    };
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() newData: UpdateUserDTO) {
    const updatedUser = await this.userService.update(id, newData);
    return {
      user: updatedUser,
      message: 'User updated successfully',
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const deletedUser = await this.userService.delete(id);
    return {
      user: deletedUser,
      message: 'User deleted successfully',
    };
  }
}
