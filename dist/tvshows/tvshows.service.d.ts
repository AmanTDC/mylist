import { Model } from 'mongoose';
import { TVShow } from './entities/tvshow.entity';
import { CursorPaginatedResponse } from '../common/interfaces/paginated-response.interface';
export declare class TvshowsService {
    private tvShowModel;
    constructor(tvShowModel: Model<TVShow>);
    findAll(filters?: {
        genre?: string;
        search?: string;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
        cursor?: string;
        limit?: number;
    }): Promise<CursorPaginatedResponse<TVShow>>;
    findOne(id: string): Promise<TVShow | null>;
}
