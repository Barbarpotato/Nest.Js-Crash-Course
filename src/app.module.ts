import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatModule } from './cats/cat.module'
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [CatModule, PrismaModule]
})

export class AppModule { }
