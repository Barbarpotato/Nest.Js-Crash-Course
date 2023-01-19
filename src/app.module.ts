import { Module } from '@nestjs/common';
import { CatModule } from './cats/cat.module'
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, CatModule, PrismaModule]
})

export class AppModule { }
