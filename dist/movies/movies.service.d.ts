import { Model } from 'mongoose';
import { Movie } from './entities/movie.entity';
import { CursorPaginatedResponse } from '../common/interfaces/paginated-response.interface';
export declare class MoviesService {
    private movieModel;
    constructor(movieModel: Model<Movie>);
    findAll(filters?: {
        genre?: string;
        search?: string;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
        cursor?: string;
        limit?: number;
    }): Promise<CursorPaginatedResponse<Movie>>;
    findOne(id: string): Promise<Movie | null>;
}
