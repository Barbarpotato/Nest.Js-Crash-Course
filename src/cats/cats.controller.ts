import { Controller, Get, Param, Post, Res, Put, ValidationPipe } from "@nestjs/common";
import { Body, Delete, HttpCode, UsePipes } from "@nestjs/common/decorators";
import { Response } from "express";
import { catService } from "./cats.service";
import { addCatDTO, updateCatDTO } from "./dto/cat.dto";

@Controller('cats')
export class catsController {
    constructor(private readonly catService: catService) {
    }
    @Get('/findCats')
    @HttpCode(200)
    async findCats(@Res() res: Response): Promise<object> {
        // const cats = this.catService.getCats()
        // return res.status(200).json(cats)
        const cats = await this.catService.getCats()
        return res.status(200).json(cats)
    }
    @Get('/findCat/:id')
    @HttpCode(200)
    async findCatDetail(
        @Res() res: Response,
        @Param('id') id: string): Promise<object> {
        const cat = await this.catService.getCatDetail(id)
        return res.status(200).json(cat)
    }
    @Post('/addCat')
    @UsePipes(ValidationPipe)
    async addedCat(
        @Res() res: Response,
        @Body() payload: addCatDTO): Promise<object> {
        await this.catService.addCat(payload)
        return res.status(201).json({ message: `successfully added cat` })
    }
    @Put('/editCat/:id')
    @UsePipes(ValidationPipe)
    editCat(
        @Res() res: Response,
        @Param('id') id: string,
        @Body() payload: updateCatDTO): object {
        this.catService.editCat(id, payload)
        return res.status(200).json({ message: `successfully edit cat with id:${id}` })
    }

    @Delete('deleteCat/:id')
    deleteCat(
        @Param('id') id: string,
        @Res() res: Response): object {
        const deleteCat = this.catService.deleteCat(id)
        return res.status(200).json({ message: `successfully deleted cat with id:${id}` })
    }
}   