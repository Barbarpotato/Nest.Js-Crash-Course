import { Injectable } from '@nestjs/common';
import { addCatDTO, updateCatDTO } from './dto/cat.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cat, CatDocument } from 'schemas/cat.schema';

@Injectable()
export class catService {
    constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) { }

    async getCats(): Promise<Cat[]> {
        return await this.catModel.find()
    }

    async addCat(payload: addCatDTO): Promise<Cat> {
        const createdCat = new this.catModel(payload);
        return createdCat.save();
    }

    async getCatDetail(id: string): Promise<Cat> {
        const cat = await this.catModel.findOne({ _id: id })
        return cat
    }

    async editCat(id: string, payload: updateCatDTO): Promise<Cat> {
        const { name, age, skinColor, weight } = payload
        return await this.catModel.findByIdAndUpdate({ _id: id }, { name, age, skinColor, weight })
    }

    async deleteCat(id: string): Promise<Cat> {
        return await this.catModel.findByIdAndDelete({ _id: id })
    }
}
