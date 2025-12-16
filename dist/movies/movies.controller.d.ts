import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CursorPaginationDto } from '../common/dto/pagination.dto';
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    create(createMovieDto: CreateMovieDto): Promise<import("./entities/movie.entity").Movie>;
    findAll(paginationDto: CursorPaginationDto, genre?: string, search?: string, sortBy?: string, sortOrder?: 'asc' | 'desc'): Promise<import("../common/interfaces/paginated-response.interface").CursorPaginatedResponse<import("./entities/movie.entity").Movie>>;
    findOne(id: string): Promise<import("./entities/movie.entity").Movie | null>;
    update(id: string, updateMovieDto: UpdateMovieDto): Promise<import("./entities/movie.entity").Movie | null>;
    remove(id: string): Promise<import("./entities/movie.entity").Movie | null>;
}
