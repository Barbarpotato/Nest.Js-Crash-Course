import { Module } from '@nestjs/common';
import { CatModule } from './cats/cat.module'
import { JwtStrategy } from '../src/cats/jwt.strategy';

@Module({
  imports: [CatModule]
})

export class AppModule { }
