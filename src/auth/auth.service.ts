import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dto/dto.login';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    async createAccessToken(User: LoginDTO): Promise<string> {
        const payload = {
            username: User.username
        }
        const accessToken = await this.jwtService.signAsync(payload)
        return accessToken
    }

    //TODO: Dummy Data Account, need to sync with DB sooner.
    async Login(User: LoginDTO): Promise<string | object> {
        const { username, password } = User
        if (username !== 'Darmawan' && password !== "hahaha123") {
            return new UnauthorizedException('Wrong email or password!')
        } else {
            return await this.createAccessToken(User)
        }
    }
}
