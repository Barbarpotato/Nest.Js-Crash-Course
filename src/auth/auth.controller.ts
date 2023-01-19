import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/dto.login';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('loginCat')
    async loginUser(@Body() LoginDTO: LoginDTO): Promise<string | object> {
        return await this.authService.Login(LoginDTO)
    }
}
