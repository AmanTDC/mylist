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
export declare const EpisodeSchema: any;
export declare class TVShow {
    title: string;
    description: string;
    genres: Genre[];
    episodes: Episode[];
}
export declare const TVShowSchema: any;
