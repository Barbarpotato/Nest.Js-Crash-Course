import { IsNotEmpty, IsInt, IsString, isString } from 'class-validator'
import { Type } from 'class-transformer'

export class CatDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    refreshToken: string;

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    age: number;

    @IsNotEmpty()
    @IsString()
    skinColor: string;

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    weight: number;
}