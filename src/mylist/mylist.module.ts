import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MylistService } from './mylist.service';
import { MylistController } from './mylist.controller';
import { MyListItem, MyListItemSchema } from './entities/mylist.entity';
import { ContentModule } from '../content/content.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: MyListItem.name, schema: MyListItemSchema },
        ]),
        ContentModule, // Import ContentModule to use ContentService
    ],
    controllers: [MylistController],
    providers: [MylistService],
})
export class MylistModule { }
