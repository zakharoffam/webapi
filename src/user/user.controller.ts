import { Body, Controller, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { ResponseInterface } from 'src/common/interfaces/response.interface';
import { CommonValidationPipe } from 'src/common/pipes/common-validation.pipe';
import { AddUserDto } from './add-user.dto';
import { UserService } from './user.service';
import { AddUserPipe } from './add-user.pipe';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('user')
    async getUser(@Query('ID', CommonValidationPipe) ID: number): Promise<ResponseInterface> {
        const user = await this.userService.user(ID);
        if (user) return {
            timestamp: new Date,
            hash: '',
            statusCode: 200,
            message: 'Найден 1 пользователь',
            result: user,
        }
        else throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    @Post('addUser')
    async addUser(@Body(new AddUserPipe) user: AddUserDto): Promise<ResponseInterface> {
        const newUserId = await this.userService.addUser(user);
        return {
            timestamp: new Date,
            hash: '',
            statusCode: 200,
            message: `Новый пользователь успешно создан c ID ${newUserId}`,
            result: user,
        };
    }

    @Get('allUsers')
    async allUsers(): Promise<ResponseInterface> {
        const users = await this.userService.allUser();
        return {
            timestamp: new Date,
            hash: '',
            statusCode: 200,
            message: 'Найдено несколько пользователей',
            result: users,
        };
    }

    @Get('testUser')
    async testUser(): Promise<any> {
        const result = await this.userService.testUser();
        return {
            message: 'Test',
            result: result,
        }
    }
}
