import { Module } from '@nestjs/common';
import { catsController } from './cats.controller';
import { catService } from './cats.service';
import { jwtConfig } from 'config/jwt.config';
import { JwtModule } from '@nestjs/jwt/dist';
import { JwtStrategy } from './jwt.strategy';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [JwtModule.register(jwtConfig), PrismaModule],
    controllers: [catsController],
    providers: [catService, JwtStrategy],
})

export class CatModule { }
