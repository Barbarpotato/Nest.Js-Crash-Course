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

