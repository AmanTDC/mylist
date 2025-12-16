import { MylistService } from './mylist.service';
import { CreateMyListItemDto } from './dto/create-mylist-item.dto';
import { QueryMyListDto } from './dto/query-mylist.dto';
export declare class MylistController {
    private readonly mylistService;
    constructor(mylistService: MylistService);
    addItem(createDto: CreateMyListItemDto): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./entities/mylist.entity").MyListItem, {}, import("mongoose").DefaultSchemaOptions> & import("./entities/mylist.entity").MyListItem & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    getList(queryDto: QueryMyListDto): Promise<{
        success: boolean;
        data: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./entities/mylist.entity").MyListItem, {}, import("mongoose").DefaultSchemaOptions> & import("./entities/mylist.entity").MyListItem & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./entities/mylist.entity").MyListItem, {}, import("mongoose").DefaultSchemaOptions> & import("./entities/mylist.entity").MyListItem & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        pagination: {
            nextCursor: string | null;
            hasNextPage: boolean;
            limit: number;
        };
    }>;
    removeItem(itemId: string, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
