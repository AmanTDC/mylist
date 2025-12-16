import { Injectable } from '@nestjs/common';
import { MoviesService } from '../movies/movies.service';
import { TvshowsService } from '../tvshows/tvshows.service';
import { CursorPaginatedResponse } from '../common/interfaces/paginated-response.interface';

@Injectable()
export class ContentService {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly tvshowsService: TvshowsService,
  ) { }

  /**
   * Get all content (movies + TV shows combined) with cursor pagination
   */
  async findAll(filters?: {
    type?: 'movie' | 'tvshow';
    genre?: string;
    search?: string;
    cursor?: string;
    limit?: number;
  }): Promise<CursorPaginatedResponse<any>> {
    const limit = filters?.limit || 20;

    // If type is specified, delegate to the appropriate service
    if (filters?.type === 'movie') {
      return this.moviesService.findAll({
        genre: filters?.genre,
        search: filters?.search,
        cursor: filters?.cursor,
        limit,
      });
    }

    if (filters?.type === 'tvshow') {
      return this.tvshowsService.findAll({
        genre: filters?.genre,
        search: filters?.search,
        cursor: filters?.cursor,
        limit,
      });
    }

    // Combined results (movies + tvshows)
    // Note: For combined results, cursor pagination becomes complex
    // This is a simplified version - for production, consider separating endpoints
    const movieResults = await this.moviesService.findAll({
      genre: filters?.genre,
      search: filters?.search,
      limit: Math.ceil(limit / 2),
    });

    const tvShowResults = await this.tvshowsService.findAll({
      genre: filters?.genre,
      search: filters?.search,
      limit: Math.ceil(limit / 2),
    });

    const combinedData = [
      ...movieResults.data.map((movie) => ({
        ...JSON.parse(JSON.stringify(movie)),
        contentType: 'Movie',
      })),
      ...tvShowResults.data.map((tvshow) => ({
        ...JSON.parse(JSON.stringify(tvshow)),
        contentType: 'TVShow',
      })),
    ];

    return {
      data: combinedData,
      pagination: {
        nextCursor: null, // Combined pagination is complex
        prevCursor: null,
        hasNext: movieResults.pagination.hasNext || tvShowResults.pagination.hasNext,
        hasPrev: false,
        limit,
      },
    };
  }

  /**
   * Get a single piece of content by ID and type
   */
  async findOne(id: string, type: 'movie' | 'tvshow'): Promise<any> {
    if (type === 'movie') {
      const movie = await this.moviesService.findOne(id);
      return movie
        ? { ...JSON.parse(JSON.stringify(movie)), contentType: 'Movie' }
        : null;
    } else {
      const tvshow = await this.tvshowsService.findOne(id);
      return tvshow
        ? { ...JSON.parse(JSON.stringify(tvshow)), contentType: 'TVShow' }
        : null;
    }
  }
}
