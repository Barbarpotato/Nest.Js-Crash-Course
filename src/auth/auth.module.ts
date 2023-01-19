import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { jwtConfig } from 'config/jwt.config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
    imports: [JwtModule.register(jwtConfig)],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule { }
