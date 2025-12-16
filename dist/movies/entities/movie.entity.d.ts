import { HydratedDocument } from 'mongoose';
import { Genre } from '../../common/enums/genre.enum';
export type MovieDocument = HydratedDocument<Movie>;
export declare class Movie {
    title: string;
    description: string;
    genres: Genre[];
    releaseDate: Date;
    director: string;
    actors: string[];
}
export declare const MovieSchema: import("mongoose").Schema<Movie, import("mongoose").Model<Movie, any, any, any, import("mongoose").Document<unknown, any, Movie, any, import("mongoose").DefaultSchemaOptions> & Movie & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any, Movie>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Movie, import("mongoose").Document<unknown, {}, Movie, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Movie & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    title?: import("mongoose").SchemaDefinitionProperty<string, Movie, import("mongoose").Document<unknown, {}, Movie, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Movie & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, Movie, import("mongoose").Document<unknown, {}, Movie, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Movie & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    genres?: import("mongoose").SchemaDefinitionProperty<Genre[], Movie, import("mongoose").Document<unknown, {}, Movie, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Movie & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    releaseDate?: import("mongoose").SchemaDefinitionProperty<Date, Movie, import("mongoose").Document<unknown, {}, Movie, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Movie & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    director?: import("mongoose").SchemaDefinitionProperty<string, Movie, import("mongoose").Document<unknown, {}, Movie, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Movie & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    actors?: import("mongoose").SchemaDefinitionProperty<string[], Movie, import("mongoose").Document<unknown, {}, Movie, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Movie & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Movie>;
