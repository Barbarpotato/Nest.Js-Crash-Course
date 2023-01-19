# Installation
```
$ npm i -g @nestjs/cli
$ nest new project-name
```

# dto Folder
DTO is the short name of Data Transfer Object. DTO is used in order to validate incoming requests.

### Why we should use DTO?
There are a few other important concepts in Nest. js: DTO: Data transfer object is an object that defines how data will be sent over the network. Interfaces: TypeScript interfaces are used for type-checking and defining the types of data that can be passed to a controller or a Nest service.

# Validations
Nest works well with the class-validator library. This powerful library allows you to use decorator-based validation. Decorator-based validation is extremely powerful, especially when combined with Nest's Pipe capabilities since we have access to the metatype of the processed property. Before we start, we need to install the required packages:
```
npm i --save class-validator class-transformer
```
### Example Used:
```
import { IsNotEmpty, IsInt } from 'class-valIdator'
import { Type } from 'class-transformer'

export class addCatDTO {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    age: number;

    @IsNotEmpty()
    skinColor: string;

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    weight: number;
}
```

### Plug-in the validation to the Global Version.
in the main.ts file addded:
```
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  # TODO: added app.useGlobalPipes(new ValidationPipe());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

```

### Plug-in the validation to the specific routes.
you can actually create specific validation to some specific routes also.
in your controller.ts file added:
```
 @Post('/addCat')
    # TODO: added UsePipes Decorator
    @UsePipes(ValidationPipe)
    addedCat(
        @Res() res: Response,
        @Body() payload: addCatDTO): object {
        const id = uuidv4()
        this.catService.addCat(id, payload)
        return res.status(201).json({ message: `successfully added cat with id:${id}` })
    }
```

# Prisma 
Prisma is an <a href="https://github.com/prisma/prisma">open source</a> next-generation ORM.
installation:
```
npm install prisma --save-dev
```

### Pull Database Schema to Prisma Model
You can Syncrhonize the database schema to the prisma model
```
npx prisma db pull
```
added @prisma/client:
```
npm i @prisma/client
```

### Push Prisma new Schema to Database
You can creating prisma schema and injected it to the database
```
npx prisma db push
```

### Generate code TypeScript to node_modules
```
npx prisma generate
```

### Creating Prisma Module and Assigned it to nest Project 
```
nest g service prisma
```
in prisma.service.ts file, setup the database connection:
```
import { Injectable, INestApplication, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }
}
```
then creating the prisma module:
```
nest g module prisma
```
in prisma module you can setup like this:
```
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule { }

```

# Jason Web Tokens (JWT)
JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.

### When should you use JSON Web Tokens?
- Authorization: This is the most common scenario for using JWT. Once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token. Single Sign On is a feature that widely uses JWT nowadays, because of its small overhead and its ability to be easily used across different domains.
- Information Exchange: JSON Web Tokens are a good way of securely transmitting information between parties. Because JWTs can be signed—for example, using public/private key pairs—you can be sure the senders are who they say they are. Additionally, as the signature is calculated using the header and the payload, you can also verify that the content hasn't been tampered with.


### What is the JSON Web Token structure?
In its compact form, JSON Web Tokens consist of three parts separated by dots (.), which are:
* Header
* Payload
* Signature
Therefore, a JWT typically looks like the following.
<br>
xxxxx.yyyyy.zzzzz
<br>

1. Header 
The header typically consists of two parts: the type of the token, which is JWT, and the signing algorithm being used, such as HMAC SHA256 or RSA.
for Example: 
```
{
  "alg": "HS256",
  "typ": "JWT"
}
```
Then, this JSON is Base64Url encoded to form the first part of the JWT.

2. Payload
The second part of the token is the payload, which contains the claims. Claims are statements about an entity (typically, the user) and additional data. There are three types of claims: registered, public, and private claims. Note that for signed tokens this information, though protected against tampering, is readable by anyone. Do not put secret information in the payload or header elements of a JWT unless it is encrypted.
for Example:
```
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```
The payload is then Base64Url encoded to form the second part of the JSON Web Token.

3. Signature
To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that. For example if you want to use the HMAC SHA256 algorithm, the signature will be created in the following way:
```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```
The signature is used to verify the message wasn't changed along the way, and, in the case of tokens signed with a private key, it can also verify that the sender of the JWT is who it says it is.

### How do JSON Web Tokens work?
In authentication, when the user successfully logs in using their credentials, a JSON Web Token will be returned. Since tokens are credentials, great care must be taken to prevent security issues. In general, you should not keep tokens longer than required.
Whenever the user wants to access a protected route or resource, the user agent should send the JWT, typically in the Authorization header using the Bearer schema. The content of the header should look like the following:
```
Authorization: Bearer <token>
```

### JWT Installation
```
npm install @nestjs/passport @nestjs/jwt passport passport-jwt
```