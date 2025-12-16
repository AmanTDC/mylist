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
export declare const MovieSchema: any;
