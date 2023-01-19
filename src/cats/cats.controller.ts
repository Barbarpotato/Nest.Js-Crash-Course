import { Controller, Get, Res, Param, ValidationPipe } from "@nestjs/common";
import { Body, Delete, HttpCode, Post, Put, UsePipes } from "@nestjs/common/decorators";
import { Response } from "express";
import { catService } from "./cats.service";
import { CatDTO } from "./dto/cat.dto";

@Controller('cats')
export class catsController {
    constructor(private catService: catService) { }
    @Get('/findCats')
    @HttpCode(200)
    async findCats(@Res() res: Response): Promise<object> {
        const cats = await this.catService.getCats()
        return res.status(200).json(cats)
    }
    @Get('/findCat/:catId')
    @HttpCode(200)
    async findCatbyId(@Param('catId') catId: string, @Res() res: Response): Promise<object> {
        const catById = await this.catService.getCatbyId(catId)
        return res.json(catById)
    }
    @Post('/addCat')
    @HttpCode(201)
    async createCat(@Body() CatDTO: CatDTO, @Res() res: Response): Promise<object> {
        await this.catService.addCat(CatDTO)
        return res.json({ message: 'successfully added new cat!' })
    }
    @Put('/updateCat/:catId')
    @UsePipes(ValidationPipe)
    async updateCatbyId(@Body() CatDTO: CatDTO,
        @Param('catId') catId: string,
        @Res() res: Response): Promise<object> {
        await this.catService.updateCat(CatDTO, catId)
        return res.json({ message: 'successfully edit cat!' })
    }
    @Delete('/deleteCat/:catId')
    async deleteCatbyId(@Param('catId') catId: string, @Res() res: Response): Promise<object> {
        await this.catService.deleteCat(catId)
        return res.json({ message: 'successfully deleted cat!' })
    }
}   