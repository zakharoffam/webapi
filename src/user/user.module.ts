import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PswUsersEntity } from './psw-user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UsersEntity } from './users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, PswUsersEntity], 'znodePg'),
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
