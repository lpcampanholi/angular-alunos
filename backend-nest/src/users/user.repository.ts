import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/CreateUser.dto';

@Injectable()
export class UserRepository {
  private users: CreateUserDTO[] = [];

  listar(): CreateUserDTO[] {
    return this.users;
  }

  salvar(user: CreateUserDTO) {
    this.users.push(user);
  }
}
