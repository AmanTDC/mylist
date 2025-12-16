import { Model } from 'mongoose';
import type { Cache } from 'cache-manager';
import { MovieDocument } from '../movies/entities/movie.entity';
import { TVShowDocument } from '../tvshows/entities/tvshow.entity';
import { ContentType } from '../mylist/entities/mylist.entity';
import { ConfigService } from '@nestjs/config';
export interface ContentDetails {
    id: string;
    contentType: ContentType;
    title: string;
    description: string;
    genres: string[];
    [key: string]: any;
}
export declare class ContentService {
    private movieModel;
    private tvShowModel;
    private cacheManager;
    private configService;
    private readonly cacheTTL;
    constructor(movieModel: Model<MovieDocument>, tvShowModel: Model<TVShowDocument>, cacheManager: Cache, configService: ConfigService);
    getContentById(contentId: string): Promise<ContentDetails>;
    getContentsByIds(contentIds: string[]): Promise<ContentDetails[]>;
    invalidateContentCache(contentId: string): Promise<void>;
    private mapMovieToContentDetails;
    private mapTVShowToContentDetails;
}
