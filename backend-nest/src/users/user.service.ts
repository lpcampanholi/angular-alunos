import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListUserDTO } from './dto/list-user-dto';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from './dto/update-user-dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOne(id: string): Promise<UserEntity | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async existWithEmail(email: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ email });
    return user !== undefined;
  }

  async list() {
    const savedUsers = await this.userRepository.find();
    const usersList = savedUsers.map(
      (user) => new ListUserDTO(user.id, user.name),
    );
    return usersList;
  }

  async create(newUser: CreateUserDTO): Promise<ListUserDTO> {
    const userEntity: UserEntity = new UserEntity();
    userEntity.id = uuid();
    userEntity.name = newUser.name;
    userEntity.email = newUser.email;
    userEntity.password = newUser.password;
    await this.userRepository.save(newUser);
    return new ListUserDTO(userEntity.id, userEntity.name);
  }

  async update(id: string, user: UpdateUserDTO): Promise<void> {
    await this.userRepository.update(id, user);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
