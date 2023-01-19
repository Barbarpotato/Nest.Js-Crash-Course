import { Injectable } from '@nestjs/common';
import { CatDTO } from './dto/cat.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class catService {
    constructor(private readonly prisma: PrismaService) { }

    getCats(): object {
        return this.prisma.cats.findMany();
    }

    getCatbyId(catId: string): object {
        return this.prisma.cats.findUnique({
            where: {
                id: catId
            }
        })
    }

    addCat(payload: CatDTO): object {
        const { name, age, skinColor, weight } = payload
        return this.prisma.cats.create({
            data: {
                v: 0,
                name: name,
                age: age,
                skinColor: skinColor,
                weight: weight
            }
        })
    }

    updateCat(payload: CatDTO, catId: string): object {
        const { name, age, skinColor, weight } = payload
        return this.prisma.cats.update({
            where: {
                id: catId
            },
            data: {
                v: 0,
                name: name,
                age: age,
                skinColor: skinColor,
                weight: weight
            }
        })
    }

    deleteCat(catId: string): object {
        return this.prisma.cats.delete({
            where: {
                id: catId
            }
        })
    }
}