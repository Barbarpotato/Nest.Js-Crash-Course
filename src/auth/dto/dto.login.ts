import { IsNotEmpty, IsInt, IsString } from 'class-validator'

export class LoginDTO {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsInt()
    password: string;
}