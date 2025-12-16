import { Model } from 'mongoose';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { CursorPaginatedResponse } from '../common/interfaces/paginated-response.interface';
export declare class MoviesService {
    private movieModel;
    constructor(movieModel: Model<Movie>);
    create(createMovieDto: CreateMovieDto): Promise<Movie>;
    findAll(filters?: {
        genre?: string;
        search?: string;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
        cursor?: string;
        limit?: number;
    }): Promise<CursorPaginatedResponse<Movie>>;
    findOne(id: string): Promise<Movie | null>;
    update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie | null>;
    remove(id: string): Promise<Movie | null>;
}
