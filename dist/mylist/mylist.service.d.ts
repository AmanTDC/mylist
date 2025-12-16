import { Model, Types } from 'mongoose';
import { MyListItemDocument } from './entities/mylist.entity';
import { CreateMyListItemDto } from './dto/create-mylist-item.dto';
import { QueryMyListDto } from './dto/query-mylist.dto';
import { ContentService } from '../content/content.service';
export declare class MylistService {
    private myListItemModel;
    private contentService;
    constructor(myListItemModel: Model<MyListItemDocument>, contentService: ContentService);
    addItemToList(createDto: CreateMyListItemDto): Promise<any>;
    getUserList(queryDto: QueryMyListDto): Promise<{
        items: ({
            title: string;
            description: string;
            genres: string[];
            _id: Types.ObjectId;
            $locals: Record<string, unknown>;
            $op: "save" | "validate" | "remove" | null;
            $where: Record<string, unknown>;
            baseModelName?: string;
            collection: import("mongoose").Collection;
            db: import("mongoose").Connection;
            errors?: import("mongoose").Error.ValidationError;
            isNew: boolean;
            schema: import("mongoose").Schema;
            userId: Types.ObjectId;
            contentId: Types.ObjectId;
            contentType: import("./entities/mylist.entity").ContentType;
            addedAt: Date;
            notes?: string;
            priority?: number;
            __v: number;
        } | {
            title: null;
            description: null;
            genres: never[];
            _id: Types.ObjectId;
            $locals: Record<string, unknown>;
            $op: "save" | "validate" | "remove" | null;
            $where: Record<string, unknown>;
            baseModelName?: string;
            collection: import("mongoose").Collection;
            db: import("mongoose").Connection;
            errors?: import("mongoose").Error.ValidationError;
            isNew: boolean;
            schema: import("mongoose").Schema;
            userId: Types.ObjectId;
            contentId: Types.ObjectId;
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
    removeItemFromList(userId: string, itemId: string): Promise<void>;
}
