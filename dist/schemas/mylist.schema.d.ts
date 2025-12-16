import { HydratedDocument, Types } from 'mongoose';
export type MyListItemDocument = HydratedDocument<MyListItem>;
export declare enum ContentType {
    Movie = "Movie",
    TVShow = "TVShow"
}
export declare class MyListItem {
    userId: Types.ObjectId;
    contentId: Types.ObjectId;
    contentType: ContentType;
    addedAt: Date;
    notes?: string;
    priority?: number;
}
export declare const MyListItemSchema: import("mongoose").Schema<MyListItem, import("mongoose").Model<MyListItem, any, any, any, import("mongoose").Document<unknown, any, MyListItem, any, import("mongoose").DefaultSchemaOptions> & MyListItem & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any, MyListItem>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MyListItem, import("mongoose").Document<unknown, {}, MyListItem, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<MyListItem & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    userId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, MyListItem, import("mongoose").Document<unknown, {}, MyListItem, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<MyListItem & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    contentId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, MyListItem, import("mongoose").Document<unknown, {}, MyListItem, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<MyListItem & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    contentType?: import("mongoose").SchemaDefinitionProperty<ContentType, MyListItem, import("mongoose").Document<unknown, {}, MyListItem, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<MyListItem & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    addedAt?: import("mongoose").SchemaDefinitionProperty<Date, MyListItem, import("mongoose").Document<unknown, {}, MyListItem, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<MyListItem & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    notes?: import("mongoose").SchemaDefinitionProperty<string | undefined, MyListItem, import("mongoose").Document<unknown, {}, MyListItem, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<MyListItem & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    priority?: import("mongoose").SchemaDefinitionProperty<number | undefined, MyListItem, import("mongoose").Document<unknown, {}, MyListItem, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<MyListItem & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, MyListItem>;
