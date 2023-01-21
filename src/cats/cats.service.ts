import { Injectable } from '@nestjs/common';
import { CatDTO } from './dto/cat.dto';
import * as bcrypt from 'bcrypt';
import { TokenExpiredError } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class catService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) { }

    async createAccessToken(catName: string): Promise<string> {
        const payload = {
            username: catName
        }
        const accessToken = await this.jwtService.signAsync(payload)
        return accessToken
    }

    async createRefreshToken(): Promise<string> {
        let generateId: string = ''
        for (let i = 0; i < 5; i++) {
            generateId += Math.random()
        }
        const refreshToken = await this.jwtService.signAsync({ id: generateId }, { expiresIn: 259200 })
        return refreshToken
    }

    async checkRefreshTokenExpired(refreshToken: string): Promise<any> {
        try {
            const checkToken = await this.jwtService.verifyAsync(refreshToken)
            return { status: 'Active' }
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                return { status: 'Expired', type: 'refresh_token' }
            }
        }
    }

    async generateAccessToken(username: string, accessToken: string): Promise<object | string> {
        const user = await this.prisma.cats.findFirst({
            where: {
                name: { equals: username }
            }
        })
        if (!user) return { message: "user validation failed", status: 'failed' }
        try {
            const checkToken = await this.jwtService.verifyAsync(accessToken)
            return { status: 'Active', type: 'access_token' }
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                const checkRefreshToken = await this.checkRefreshTokenExpired(user.refreshToken)
                if (checkRefreshToken.status === 'Expired') return { status: 'Expired', type: 'refresh_token' }
                else {
                    const refreshToken = await this.createAccessToken(username)
                    return refreshToken
                }
            }
            return error
        }
    }

    async loginCats(username: string, password: string): Promise<object> {
        const user = await this.prisma.cats.findFirst({
            where: {
                name: { equals: username }
            }
        })
        if (!user) return { message: "user validation failed", status: 'failed' }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return { message: "user validation failed", status: 'failed' }
        const checkRefreshToken = await this.checkRefreshTokenExpired(user.refreshToken)
        //? Updating RefreshToken if expired.
        if (checkRefreshToken.status === 'Expired') {
            const refreshToken = await this.createRefreshToken()
            await this.prisma.cats.update({
                where: {
                    id: user.id
                },
                data: {
                    refreshToken: refreshToken
                }
            })
        }
        const accessToken = await this.createAccessToken(user.name)
        return { user, accessToken: accessToken }
    }

    async signUpCat(payload: CatDTO): Promise<object> {
        const { name, password, age, skinColor, weight } = payload
        const saltOrRounds = 10
        const hashPassword = await bcrypt.hash(password, saltOrRounds)
        const accessToken = await this.createAccessToken(name)
        const refreshToken = await this.createRefreshToken()
        const user = await this.prisma.cats.create({
            data: {
                v: 0,
                password: hashPassword,
                name: name,
                age: age,
                skinColor: skinColor,
                weight: weight,
                refreshToken: refreshToken
            }
        })
        return { user, refreshToken: refreshToken, accessToken: accessToken }
    }

    getCatbyId(catId: string): object {
        return this.prisma.cats.findUnique({
            where: {
                id: catId
            }
        })
    }

    updateCat(payload: CatDTO, catId: string): object {
        const { name, password, age, skinColor, weight } = payload
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