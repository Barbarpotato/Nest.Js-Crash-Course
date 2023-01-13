import { IsNotEmpty, IsInt, IsString } from 'class-validator'
import { Type } from 'class-transformer'

export class addCatDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

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

export class updateCatDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

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