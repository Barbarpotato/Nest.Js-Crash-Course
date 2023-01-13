import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatModule } from './cats/cat.module'

@Module({
  imports: [CatModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/Cat')]
})

export class AppModule { }
