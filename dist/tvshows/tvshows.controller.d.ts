import { TvshowsService } from './tvshows.service';
import { CursorPaginationDto } from '../common/dto/pagination.dto';
export declare class TvshowsController {
    private readonly tvshowsService;
    constructor(tvshowsService: TvshowsService);
    findAll(paginationDto: CursorPaginationDto): Promise<import("../common/interfaces/paginated-response.interface").CursorPaginatedResponse<import("./entities/tvshow.entity").TVShow>>;
    findOne(id: string): Promise<import("./entities/tvshow.entity").TVShow | null>;
}
