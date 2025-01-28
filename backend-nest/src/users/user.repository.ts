import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async list(): Promise<CreateUserDTO[]> {
    return this.users;
  }

  async save(user: UserEntity) {
    this.users.push(user);
  }

  async existWithEmail(email: string) {
    const user = this.users.find((user) => user.email === email);
    return user !== undefined;
  }
}
