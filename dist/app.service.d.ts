import { Model } from 'mongoose';
import { Movie } from './movies/entities/movie.entity';
import { TVShow } from './tvshows/entities/tvshow.entity';
import { Genre } from './common/enums/genre.enum';
export declare class AppService {
    private movieModel;
    private tvShowModel;
    constructor(movieModel: Model<Movie>, tvShowModel: Model<TVShow>);
    getHello(): string;
    createMovie(movieData: Partial<Movie>): Promise<Movie>;
    getMoviesByGenre(genre: Genre): Promise<Movie[]>;
    createTVShow(tvShowData: Partial<TVShow>): Promise<TVShow>;
    addEpisode(tvShowId: string, episodeData: {
        episodeNumber: number;
        seasonNumber: number;
        releaseDate: Date;
        director: string;
        actors: string[];
    }): Promise<TVShow | null>;
}
