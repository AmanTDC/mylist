import { Genre } from '../../common/enums/genre.enum';
export declare class CreateMovieDto {
    title: string;
    description: string;
    genres: Genre[];
    releaseDate: Date;
    director: string;
    actors?: string[];
}
