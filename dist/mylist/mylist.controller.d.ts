import { MylistService } from './mylist.service';
import { CreateMyListItemDto } from './dto/create-mylist-item.dto';
import { QueryMyListDto } from './dto/query-mylist.dto';
export declare class MylistController {
    private readonly mylistService;
    constructor(mylistService: MylistService);
    addItem(createDto: CreateMyListItemDto): Promise<{
        success: boolean;
        message: string;
        data: HydratedDocument<import("./entities/mylist.entity").MyListItem>;
    }>;
    getList(queryDto: QueryMyListDto): Promise<{
        success: boolean;
        data: any;
        pagination: {
            nextCursor: any;
            hasNextPage: boolean;
            limit: number;
        };
    }>;
    removeItem(itemId: string, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
