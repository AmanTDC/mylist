import { MoviesService } from './movies.service';
import { CursorPaginationDto } from '../common/dto/pagination.dto';
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    findAll(paginationDto: CursorPaginationDto, genre?: string, search?: string, sortBy?: string, sortOrder?: 'asc' | 'desc'): Promise<import("../common/interfaces/paginated-response.interface").CursorPaginatedResponse<import("./entities/movie.entity").Movie>>;
    findOne(id: string): Promise<import("./entities/movie.entity").Movie | null>;
}
