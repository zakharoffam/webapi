import { Injectable } from '@nestjs/common';
import { PswUsersEntity } from 'src/user/psw-user.entity';
import { UserInterface } from 'src/user/user.interface';
import { UsersEntity } from 'src/user/users.entity';
import { Connection } from 'typeorm';
import { AuthUserDto } from './auth-user.dto';
import * as md5 from 'md5';
import { InjectConnection } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private configService: ConfigService,

        @InjectConnection('znodePg')
        private dbConnect: Connection,
    ) {}

    /**
     * Метод аутентификации пользователя
     * @param userData Данные пользователя
     */
    async authUser(userData: AuthUserDto): Promise<boolean> {
        const secret = this.configService.get<string>('secret');
        
        const validUser = await this.dbConnect
            .createQueryBuilder(UsersEntity, 'user')
            .where('user.EMAIL = :email', {email: userData.EMAIL})
            .getOne();

        const validPassword = await this.dbConnect
            .createQueryBuilder(PswUsersEntity, 'user')
            .where('user.PSW = :psw', {psw: md5(userData.PSW)})
            .getOne();

        if (validUser && validPassword) {
            if (validUser.ID === validPassword.USER_ID) return true;
        } else return false;
    }
}
