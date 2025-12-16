import { CursorPaginationDto } from '../common/dto/pagination.dto';
import { MoviesService } from './movies.service';
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    findAll(paginationDto: CursorPaginationDto): Promise<import("../common/interfaces/paginated-response.interface").CursorPaginatedResponse<import("./entities/movie.entity").Movie>>;
    findOne(id: string): Promise<import("./entities/movie.entity").Movie | null>;
}
