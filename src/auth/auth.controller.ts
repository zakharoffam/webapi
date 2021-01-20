import { Controller, Get, HttpException, Query } from '@nestjs/common';
import { GetResponseInterface } from 'src/common/interfaces/get-response.interface';
import { AuthUserDto } from './auth-user.dto';
import { AuthUserPipe } from './auth-user.pipe';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    /**
     * Метод аутентификации пользователя
     * @param userData
     */
    @Get('user')
    async authUser(@Query(new AuthUserPipe) userData: AuthUserDto): Promise<GetResponseInterface | HttpException> {
        const authUser = await this.authService.authUser(userData);

        if (authUser) return {
            message: 'Пользователь аутентифицирован',
            result: authUser
        }
        else throw new HttpException('Пользователь не аутентифицирован', 401);
    }
}
