import { MoviesService } from '../movies/movies.service';
import { TvshowsService } from '../tvshows/tvshows.service';
import { CursorPaginatedResponse } from '../common/interfaces/paginated-response.interface';
export declare class ContentService {
    private readonly moviesService;
    private readonly tvshowsService;
    constructor(moviesService: MoviesService, tvshowsService: TvshowsService);
    findAll(filters?: {
        type?: 'movie' | 'tvshow';
        genre?: string;
        search?: string;
        cursor?: string;
        limit?: number;
    }): Promise<CursorPaginatedResponse<any>>;
    findOne(id: string, type: 'movie' | 'tvshow'): Promise<any>;
}
