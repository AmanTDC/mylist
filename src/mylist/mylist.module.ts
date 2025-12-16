import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MylistService } from './mylist.service';
import { MylistController } from './mylist.controller';
import { MyListItem, MyListItemSchema } from './entities/mylist.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: MyListItem.name, schema: MyListItemSchema },
        ]),
    ],
    controllers: [MylistController],
    providers: [MylistService],
    exports: [MylistService],
})
export class MylistModule { }
