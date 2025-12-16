# NestJS with Mongoose - Setup Guide

This project is a NestJS application configured with Mongoose for MongoDB data modeling.

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (running locally or access to a MongoDB Atlas cluster)
- npm or yarn

## Installation

Dependencies have already been installed. If you need to reinstall:

```bash
npm install
```

## MongoDB Setup

### Option 1: Local MongoDB
1. Install MongoDB on your machine
2. Start MongoDB service:
   ```bash
   mongod
   ```
3. The default connection string is: `mongodb://localhost:27017/my-list-feature`

### Option 2: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and get your connection string
3. Update the connection string in `src/app.module.ts`:
   ```typescript
   MongooseModule.forRoot('your-mongodb-atlas-connection-string')
   ```

## Environment Variables

You can use environment variables for configuration:

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Update the values in `.env`
3. Install `@nestjs/config` to use environment variables:
   ```bash
   npm install @nestjs/config
   ```

## Running the Application

```bash
# Development mode with hot-reload
npm run start:dev

# Production mode
npm run start:prod

# Debug mode
npm run start:debug
```

The application will start on `http://localhost:3000`

## Project Structure

```
src/
├── app.module.ts        # Main module with Mongoose configuration
├── app.controller.ts    # Sample controller
├── app.service.ts       # Sample service
├── main.ts              # Application entry point
└── schemas/             # Mongoose schemas
    └── item.schema.ts   # Example schema for Item model
```

## Using Mongoose Schemas

### 1. Create a Schema

See `src/schemas/item.schema.ts` for an example. Key points:

- Use `@Schema()` decorator to define a schema class
- Use `@Prop()` decorator for properties
- `timestamps: true` adds createdAt and updatedAt fields automatically
- Export both the class and the schema factory

### 2. Register Schema in Module

In your feature module (or app.module.ts):

```typescript
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from './schemas/item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Item.name, schema: ItemSchema }
    ])
  ],
})
export class YourModule {}
```

### 3. Use in Service

```typescript
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from './schemas/item.schema';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name) private itemModel: Model<Item>
  ) {}

  async create(createItemDto: any): Promise<Item> {
    const item = new this.itemModel(createItemDto);
    return item.save();
  }

  async findAll(): Promise<Item[]> {
    return this.itemModel.find().exec();
  }

  async findOne(id: string): Promise<Item> {
    return this.itemModel.findById(id).exec();
  }

  async update(id: string, updateItemDto: any): Promise<Item> {
    return this.itemModel
      .findByIdAndUpdate(id, updateItemDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Item> {
    return this.itemModel.findByIdAndDelete(id).exec();
  }
}
```

## Generating Resources

NestJS CLI can generate complete CRUD resources:

```bash
# Generate a complete resource with controller, service, module, and DTOs
npx nest generate resource users

# Choose REST API when prompted
# Choose "Would you like to generate CRUD entry points?" - Yes
```

This will create:
- Module
- Controller with CRUD endpoints
- Service with CRUD methods
- DTOs (Data Transfer Objects)

Then add Mongoose integration:
1. Create a schema in `src/users/schemas/user.schema.ts`
2. Import MongooseModule in the users module
3. Inject the model in the service

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Next Steps

1. **Set up MongoDB connection** - Update connection string in `app.module.ts`
2. **Create your schemas** - Define your data models in `src/schemas/`
3. **Generate resources** - Use `nest generate resource` to create modules
4. **Add DTOs** - Create Data Transfer Objects for validation
5. **Add validation** - Install `class-validator` and `class-transformer`:
   ```bash
   npm install class-validator class-transformer
   ```
6. **Configure environment variables** - Use `@nestjs/config` for better config management

## Useful Commands

```bash
# Generate module
npx nest generate module users

# Generate controller
npx nest generate controller users

# Generate service
npx nest generate service users

# Generate complete resource
npx nest generate resource users
```

## Documentation

- [NestJS Documentation](https://docs.nestjs.com/)
- [Mongoose NestJS Integration](https://docs.nestjs.com/techniques/mongodb)
- [Mongoose Documentation](https://mongoosejs.com/)
