import { Controller, Get, Res, Param, ValidationPipe } from "@nestjs/common";
import { Body, Delete, HttpCode, Post, Put, UseGuards, UsePipes } from "@nestjs/common/decorators";
import { Response } from "express";
import { AuthGuard } from '@nestjs/passport';
import { catService } from "./cats.service";
import { CatDTO } from "./dto/cat.dto";

@Controller('cats')
export class catsController {
    constructor(private catService: catService) { }

    @Post('/generateToken')
    async checkToken(@Body('username') username: string,
        @Body('accessToken') accessToken: string) {
        return await this.catService.generateAccessToken(username, accessToken)
    }

    @Post('/loginCat')
    async loginCat(@Body('username') username: string,
        @Body('password') password: string,
        @Res() res: Response): Promise<object> {
        const output = await this.catService.loginCats(username, password)
        return res.status(200).json(output)
    }

    @Post('/signupCat')
    @UsePipes(ValidationPipe)
    @HttpCode(201)
    async createCat(@Body() CatDTO: CatDTO, @Res() res: Response): Promise<object> {
        await this.catService.signUpCat(CatDTO)
        return res.json({ message: 'successfully register cat' })
    }

    @Get('/findCat/:catId')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(200)
    async findCatbyId(@Param('catId') catId: string, @Res() res: Response): Promise<object> {
        const catById = await this.catService.getCatbyId(catId)
        return res.json(catById)
    }
    @Put('/updateCat/:catId')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(ValidationPipe)
    async updateCatbyId(@Body() CatDTO: CatDTO,
        @Param('catId') catId: string,
        @Res() res: Response): Promise<object> {
        await this.catService.updateCat(CatDTO, catId)
        return res.json({ message: 'successfully edit cat!' })
    }

    @Delete('/deleteCat/:catId')
    @UseGuards(AuthGuard('jwt'))
    async deleteCatbyId(@Param('catId') catId: string, @Res() res: Response): Promise<object> {
        await this.catService.deleteCat(catId)
        return res.json({ message: 'successfully deleted cat!' })
    }
}   