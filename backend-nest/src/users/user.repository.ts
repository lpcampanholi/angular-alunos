import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async findOne(id: string) {
    const userFound = await this.users.find((savedUser) => savedUser.id === id);
    if (!userFound) {
      throw new Error('User not found');
    }
    return userFound;
  }

  async list(): Promise<UserEntity[]> {
    return this.users;
  }

  async save(user: UserEntity) {
    await this.users.push(user);
  }

  async existWithEmail(email: string) {
    const user = await this.users.find((user) => user.email === email);
    return user !== undefined;
  }

  async update(
    id: string,
    updateData: Partial<UserEntity>,
  ): Promise<UserEntity> {
    const userFound = await this.findOne(id);
    Object.entries(updateData).forEach(([key, value]) => {
      if (key === id) {
        return;
      }
      userFound[key] = value;
    });
    return userFound;
  }

  async delete(id: string) {
    const foundUser = await this.findOne(id);
    this.users = this.users.filter((savedUser) => savedUser.id !== id);
    return foundUser;
  }
}
