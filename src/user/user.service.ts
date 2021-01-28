import { Injectable } from '@nestjs/common';
import { Connection, CreateDateColumn } from 'typeorm';
import { AddUserDto } from './add-user.dto';
import { PswUsersEntity } from './psw-user.entity';
import { UserInterface } from './user.interface';
import { UsersEntity } from './users.entity';
import * as md5 from 'md5';
import { InjectConnection } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectConnection('znodePg')
        private dbConnect: Connection,
    ) {}

    /**
     * Метод получения данных пользователя
     * @param ID Почта пользователя
     */
    async user(ID: number): Promise<UserInterface | false> {
        const userData = await this.dbConnect
            .createQueryBuilder(UsersEntity, 'user')
            .where('user.ID = :id', {id: ID})
            .getOne();
        return userData ? userData : false;
    }

    /**
     * Метод создания нового пользователя
     * @param user Данные пользователя
     */
    async addUser(user: AddUserDto): Promise<string> {
        // Создаем нового пользователя
        const newUser: any = await this.dbConnect
            .createQueryBuilder(UsersEntity, 'user')
            .insert()
            .into(UsersEntity)
            .values([user])
            .execute();
        
        // Получаем ID нового пользователя
        const newUserId: any = newUser.generatedMaps.map((item) => {return item.ID})[0];

        // Записываем пароль нового пользователя
        await this.dbConnect
            .createQueryBuilder(PswUsersEntity, 'user')
            .insert()
            .into(PswUsersEntity)
            .values([{USER_ID: newUserId, PSW: md5(user.PSW)}])
            .execute()

        return newUserId;
    }


    async allUser(): Promise<Array<Object>> {
        const users = await this.dbConnect
            .createQueryBuilder(UsersEntity, 'user')
            .getMany();
        return users;
    }

    async testUser(): Promise<any> {
        const qu = await this.dbConnect
            .query(`SELECT func_increment(5)`)
        
        return qu[0].func_increment;
    }
}
