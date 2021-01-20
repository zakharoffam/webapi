import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PswUsersEntity } from 'src/user/psw-user.entity';
import { UsersEntity } from 'src/user/users.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UsersEntity, PswUsersEntity], 'znodePg'),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
