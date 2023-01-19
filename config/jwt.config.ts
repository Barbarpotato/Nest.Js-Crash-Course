import { JwtModuleOptions } from "@nestjs/jwt";

export const jwtConfig: JwtModuleOptions = {
    secret: '123-456-789',
    signOptions: {
        expiresIn: 60
    }
}