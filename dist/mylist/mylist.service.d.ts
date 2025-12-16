import { Model, Types } from 'mongoose';
import { MyListItem, MyListItemDocument } from './entities/mylist.entity';
import { CreateMyListItemDto } from './dto/create-mylist-item.dto';
import { QueryMyListDto } from './dto/query-mylist.dto';
export declare class MylistService {
    private myListItemModel;
    constructor(myListItemModel: Model<MyListItemDocument>);
    addItemToList(createDto: CreateMyListItemDto): Promise<MyListItemDocument>;
    getUserList(queryDto: QueryMyListDto): Promise<{
        items: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, MyListItem, {}, import("mongoose").DefaultSchemaOptions> & MyListItem & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, MyListItem, {}, import("mongoose").DefaultSchemaOptions> & MyListItem & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>)[];
        pagination: {
            nextCursor: string | null;
            hasNextPage: boolean;
            limit: number;
        };
    }>;
    removeItemFromList(userId: string, itemId: string): Promise<void>;
    isItemInList(userId: string, contentId: string): Promise<boolean>;
}
