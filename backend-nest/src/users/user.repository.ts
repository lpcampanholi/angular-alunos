import { Injectable } from '@nestjs/common';
import { User } from './user';

@Injectable()
export class UserRepository {
  private users: User[] = [];

  listar(): User[] {
    return this.users;
  }

  salvar(user: User) {
    this.users.push(user);
  }
}
