import { HydratedDocument } from 'mongoose';
import { Genre } from '../common/enums/genre.enum';
export type UserDocument = HydratedDocument<User>;
export declare class Preferences {
    favoriteGenres: Genre[];
    dislikedGenres: Genre[];
}
export declare const PreferencesSchema: import("mongoose").Schema<Preferences, import("mongoose").Model<Preferences, any, any, any, import("mongoose").Document<unknown, any, Preferences, any, import("mongoose").DefaultSchemaOptions> & Preferences & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any, Preferences>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Preferences, import("mongoose").Document<unknown, {}, Preferences, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Preferences & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    favoriteGenres?: import("mongoose").SchemaDefinitionProperty<Genre[], Preferences, import("mongoose").Document<unknown, {}, Preferences, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Preferences & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    dislikedGenres?: import("mongoose").SchemaDefinitionProperty<Genre[], Preferences, import("mongoose").Document<unknown, {}, Preferences, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Preferences & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Preferences>;
export declare class WatchHistoryItem {
    contentId: string;
    watchedOn: Date;
    rating?: number;
}
export declare const WatchHistoryItemSchema: import("mongoose").Schema<WatchHistoryItem, import("mongoose").Model<WatchHistoryItem, any, any, any, import("mongoose").Document<unknown, any, WatchHistoryItem, any, import("mongoose").DefaultSchemaOptions> & WatchHistoryItem & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any, WatchHistoryItem>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, WatchHistoryItem, import("mongoose").Document<unknown, {}, WatchHistoryItem, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<WatchHistoryItem & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    contentId?: import("mongoose").SchemaDefinitionProperty<string, WatchHistoryItem, import("mongoose").Document<unknown, {}, WatchHistoryItem, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<WatchHistoryItem & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    watchedOn?: import("mongoose").SchemaDefinitionProperty<Date, WatchHistoryItem, import("mongoose").Document<unknown, {}, WatchHistoryItem, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<WatchHistoryItem & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    rating?: import("mongoose").SchemaDefinitionProperty<number | undefined, WatchHistoryItem, import("mongoose").Document<unknown, {}, WatchHistoryItem, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<WatchHistoryItem & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, WatchHistoryItem>;
export declare class User {
    username: string;
    preferences: Preferences;
    watchHistory: WatchHistoryItem[];
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, import("mongoose").Document<unknown, any, User, any, import("mongoose").DefaultSchemaOptions> & User & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any, User>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, User, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<User & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    username?: import("mongoose").SchemaDefinitionProperty<string, User, import("mongoose").Document<unknown, {}, User, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    preferences?: import("mongoose").SchemaDefinitionProperty<Preferences, User, import("mongoose").Document<unknown, {}, User, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    watchHistory?: import("mongoose").SchemaDefinitionProperty<WatchHistoryItem[], User, import("mongoose").Document<unknown, {}, User, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, User>;
