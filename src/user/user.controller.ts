import { Body, Controller, Get, HttpException, Post, Query } from '@nestjs/common';
import { GetResponseInterface } from 'src/common/interfaces/get-response.interface';
import { PostResponseInterface } from 'src/common/interfaces/post-response.interface';
import { CommonValidationPipe } from 'src/common/pipes/common-validation.pipe';
import { AddUserDto } from './add-user.dto';
import { UserService } from './user.service';
import { AddUserPipe } from './add-user.pipe';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('user')
    async getUser(@Query('ID', CommonValidationPipe) ID: number): Promise<GetResponseInterface | HttpException> {
        const user = await this.userService.user(ID);
        if (user) return {
            message: 'Пользователь найден',
            result: user,
        }
        else throw new HttpException('Пользователь не найден', 404);
    }

    @Post('addUser')
    async addUser(@Body(new AddUserPipe) user: AddUserDto): Promise<PostResponseInterface> {
        const newUserId = await this.userService.addUser(user);
        return {
            message: `Новый пользователь успешно создан c ID ${newUserId}`,
        };
    }

    @Get('allUsers')
    async allUsers(): Promise<GetResponseInterface> {
        const users = await this.userService.allUser();
        return {
            message: 'Пользователи',
            result: users,
        };
    }
}
