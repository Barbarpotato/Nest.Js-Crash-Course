import { Module } from '@nestjs/common';
import { catsController } from './cats.controller';
import { catService } from './cats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from '../../schemas/cat.schema'

@Module({
    imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
    controllers: [catsController],
    providers: [catService],
})

export class CatModule { }
