import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { EmailIsUniqueValidator } from './validators/email-is-unique.validator';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, EmailIsUniqueValidator],
})
export class UserModule {}
