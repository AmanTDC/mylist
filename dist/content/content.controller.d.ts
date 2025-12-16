import { ContentService } from './content.service';
import { CursorPaginationDto } from '../common/dto/pagination.dto';
export declare class ContentController {
    private readonly contentService;
    constructor(contentService: ContentService);
    findAll(paginationDto: CursorPaginationDto, type?: 'movie' | 'tvshow', genre?: string, search?: string): Promise<import("../common/interfaces/paginated-response.interface").CursorPaginatedResponse<any>>;
    findOne(id: string, type: 'movie' | 'tvshow'): Promise<any>;
}
