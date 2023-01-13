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

# TypeORM
For integrating with SQL and NoSQL databases, Nest provides the @nestjs/typeorm package. Nest uses TypeORM because it's the most mature Object Relational Mapper (ORM) available for TypeScript. Since it's written in TypeScript, it integrates well with the Nest framework.

### Mongo
Nest supports two methods for integrating with the MongoDB database. You can either use the built-in TypeORM module described here, which has a connector for MongoDB, or use Mongoose
Start by installing the required dependencies:
```
npm i @nestjs/mongoose mongoose
```
