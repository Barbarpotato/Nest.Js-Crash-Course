import { Module } from '@nestjs/common';
import { catsController } from './cats.controller';
import { catService } from './cats.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [catsController],
    providers: [catService],
})

export class CatModule { }
