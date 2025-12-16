import { ContentType } from '../entities/mylist.entity';
export declare class QueryMyListDto {
    userId: string;
    contentType?: ContentType;
    sortBy?: 'addedAt' | 'priority';
    sortOrder?: 'asc' | 'desc';
    cursor?: string;
    limit?: number;
}
