import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListUserDTO } from './dto/list-user-dto';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async listUsers() {
    const savedUsers = await this.userRepository.find();
    const usersList = savedUsers.map(
      (user) => new ListUserDTO(user.id, user.name),
    );
    return usersList;
  }
}
