import { MylistService } from './mylist.service';
import { CreateMyListItemDto } from './dto/create-mylist-item.dto';
import { QueryMyListDto } from './dto/query-mylist.dto';
export declare class MylistController {
    private readonly mylistService;
    constructor(mylistService: MylistService);
    addItem(createDto: CreateMyListItemDto): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    getList(queryDto: QueryMyListDto): Promise<{
        success: boolean;
        data: ({
            title: string;
            description: string;
            genres: string[];
            _id: import("mongoose").Types.ObjectId;
            $locals: Record<string, unknown>;
            $op: "save" | "validate" | "remove" | null;
            $where: Record<string, unknown>;
            baseModelName?: string;
            collection: import("mongoose").Collection;
            db: import("mongoose").Connection;
            errors?: import("mongoose").Error.ValidationError;
            isNew: boolean;
            schema: import("mongoose").Schema;
            userId: import("mongoose").Types.ObjectId;
            contentId: import("mongoose").Types.ObjectId;
            contentType: import("./entities/mylist.entity").ContentType;
            addedAt: Date;
            notes?: string;
            priority?: number;
            __v: number;
        } | {
            title: null;
            description: null;
            genres: never[];
            _id: import("mongoose").Types.ObjectId;
            $locals: Record<string, unknown>;
            $op: "save" | "validate" | "remove" | null;
            $where: Record<string, unknown>;
            baseModelName?: string;
            collection: import("mongoose").Collection;
            db: import("mongoose").Connection;
            errors?: import("mongoose").Error.ValidationError;
            isNew: boolean;
            schema: import("mongoose").Schema;
            userId: import("mongoose").Types.ObjectId;
            contentId: import("mongoose").Types.ObjectId;
            contentType: import("./entities/mylist.entity").ContentType;
            addedAt: Date;
            notes?: string;
            priority?: number;
            __v: number;
        })[];
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
