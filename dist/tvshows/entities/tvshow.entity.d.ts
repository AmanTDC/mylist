import { HydratedDocument } from 'mongoose';
import { Genre } from '../../common/enums/genre.enum';
export type TVShowDocument = HydratedDocument<TVShow>;
export declare class Episode {
    episodeNumber: number;
    seasonNumber: number;
    releaseDate: Date;
    director: string;
    actors: string[];
}
export declare const EpisodeSchema: import("mongoose").Schema<Episode, import("mongoose").Model<Episode, any, any, any, import("mongoose").Document<unknown, any, Episode, any, import("mongoose").DefaultSchemaOptions> & Episode & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any, Episode>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Episode, import("mongoose").Document<unknown, {}, Episode, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Episode & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    episodeNumber?: import("mongoose").SchemaDefinitionProperty<number, Episode, import("mongoose").Document<unknown, {}, Episode, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Episode & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    seasonNumber?: import("mongoose").SchemaDefinitionProperty<number, Episode, import("mongoose").Document<unknown, {}, Episode, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Episode & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    releaseDate?: import("mongoose").SchemaDefinitionProperty<Date, Episode, import("mongoose").Document<unknown, {}, Episode, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Episode & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    director?: import("mongoose").SchemaDefinitionProperty<string, Episode, import("mongoose").Document<unknown, {}, Episode, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Episode & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    actors?: import("mongoose").SchemaDefinitionProperty<string[], Episode, import("mongoose").Document<unknown, {}, Episode, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Episode & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Episode>;
export declare class TVShow {
    title: string;
    description: string;
    genres: Genre[];
    episodes: Episode[];
}
export declare const TVShowSchema: import("mongoose").Schema<TVShow, import("mongoose").Model<TVShow, any, any, any, import("mongoose").Document<unknown, any, TVShow, any, import("mongoose").DefaultSchemaOptions> & TVShow & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any, TVShow>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TVShow, import("mongoose").Document<unknown, {}, TVShow, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<TVShow & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    title?: import("mongoose").SchemaDefinitionProperty<string, TVShow, import("mongoose").Document<unknown, {}, TVShow, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<TVShow & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, TVShow, import("mongoose").Document<unknown, {}, TVShow, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<TVShow & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    genres?: import("mongoose").SchemaDefinitionProperty<Genre[], TVShow, import("mongoose").Document<unknown, {}, TVShow, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<TVShow & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    episodes?: import("mongoose").SchemaDefinitionProperty<Episode[], TVShow, import("mongoose").Document<unknown, {}, TVShow, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<TVShow & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, TVShow>;
