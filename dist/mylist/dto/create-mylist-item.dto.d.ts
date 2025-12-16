import { ContentType } from '../entities/mylist.entity';
export declare class CreateMyListItemDto {
    userId: string;
    contentId: string;
    contentType: ContentType;
    notes?: string;
    priority?: number;
}
