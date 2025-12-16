import { Model } from 'mongoose';
import { MyListItemDocument } from './entities/mylist.entity';
import { CreateMyListItemDto } from './dto/create-mylist-item.dto';
import { QueryMyListDto } from './dto/query-mylist.dto';
export declare class MylistService {
    private myListItemModel;
    constructor(myListItemModel: Model<MyListItemDocument>);
    addItemToList(createDto: CreateMyListItemDto): Promise<MyListItemDocument>;
    getUserList(queryDto: QueryMyListDto): Promise<{
        items: any;
        pagination: {
            nextCursor: any;
            hasNextPage: boolean;
            limit: number;
        };
    }>;
    removeItemFromList(userId: string, itemId: string): Promise<void>;
    isItemInList(userId: string, contentId: string): Promise<boolean>;
}
