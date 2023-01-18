import { Controller, Get, Res } from "@nestjs/common";
import { HttpCode } from "@nestjs/common/decorators";
import { Response } from "express";
import { catService } from "./cats.service";

@Controller('cats')
export class catsController {
    constructor(private catService: catService) {
    }
    @Get('/findCats')
    @HttpCode(200)
    async findCats(@Res() res: Response): Promise<object> {
        const cats = await this.catService.all()
        return res.status(200).json(cats)
    }
}   