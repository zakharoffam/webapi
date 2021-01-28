import { Controller, Get, HttpException, Query } from '@nestjs/common';
import { ResponseInterface } from 'src/common/interfaces/response.interface';
import { CommonValidationPipe } from 'src/common/pipes/common-validation.pipe';
import { AuthUserDto } from './auth-user.dto';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    /**
     * Метод аутентификации пользователя
     * @param userData
     */
    @Get('user')
    async authUser(@Query(new CommonValidationPipe) userData: AuthUserDto): Promise<ResponseInterface> {
        const authUser = await this.authService.authUser(userData);

        if (authUser) return {
            timestamp: new Date,
            hash: '',
            statusCode: 200,
            message: 'Пользователь аутентифицирован',
            result: authUser,
        }
        else throw new HttpException('Пользователь не аутентифицирован', 401);
    }
}
