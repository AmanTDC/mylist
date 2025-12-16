import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { Movie, MovieDocument } from '../movies/entities/movie.entity';
import { TVShow, TVShowDocument } from '../tvshows/entities/tvshow.entity';
import { ContentType } from '../mylist/entities/mylist.entity';
import { ConfigService } from '@nestjs/config';

export interface ContentDetails {
  id: string;
  contentType: ContentType;
  title: string;
  description: string;
  genres: string[];
  [key: string]: any; // For additional fields like releaseDate, director, etc.
}

@Injectable()
export class ContentService {
  private readonly cacheTTL: number;

  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
    @InjectModel(TVShow.name) private tvShowModel: Model<TVShowDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService,
  ) {
    // Get cache TTL from environment or default to 24 hours (86400 seconds)
    this.cacheTTL = this.configService.get<number>('CONTENT_CACHE_TTL', 86400);
  }

  /**
   * Get content by ID with automatic type detection and caching
   * Checks cache first, then searches both Movies and TVShows collections
   */
  async getContentById(contentId: string): Promise<ContentDetails> {
    if (!Types.ObjectId.isValid(contentId)) {
      throw new NotFoundException(`Invalid content ID: ${contentId}`);
    }

    // Check cache first
    const cacheKey = `content:${contentId}`;
    const cached = await this.cacheManager.get<ContentDetails>(cacheKey);

    if (cached) {
      return cached;
    }

    // Not in cache, search in database
    // Try to find in Movies first
    const movie = await this.movieModel.findById(contentId).exec();
    if (movie) {
      const contentDetails = this.mapMovieToContentDetails(movie);
      await this.cacheManager.set(cacheKey, contentDetails, this.cacheTTL * 1000); // Convert to ms
      return contentDetails;
    }

    // If not found in Movies, try TVShows
    const tvShow = await this.tvShowModel.findById(contentId).exec();
    if (tvShow) {
      const contentDetails = this.mapTVShowToContentDetails(tvShow);
      await this.cacheManager.set(cacheKey, contentDetails, this.cacheTTL * 1000); // Convert to ms
      return contentDetails;
    }

    // Content not found in either collection
    throw new NotFoundException(`Content with ID ${contentId} not found`);
  }

  /**
   * Get multiple contents by IDs (batch operation)
   * Useful for populating user's list
   */
  async getContentsByIds(contentIds: string[]): Promise<ContentDetails[]> {
    const promises = contentIds.map(id => this.getContentById(id));
    return Promise.all(promises);
  }

  /**
   * Manually invalidate cache for a specific content ID
   * Useful if content is updated (though rare for movies/shows)
   */
  async invalidateContentCache(contentId: string): Promise<void> {
    const cacheKey = `content:${contentId}`;
    await this.cacheManager.del(cacheKey);
  }

  /**
   * Map Movie entity to ContentDetails
   */
  private mapMovieToContentDetails(movie: MovieDocument): ContentDetails {
    return {
      id: movie._id.toString(),
      contentType: ContentType.Movie,
      title: movie.title,
      description: movie.description,
      genres: movie.genres,
      releaseDate: movie.releaseDate,
      director: movie.director,
      actors: movie.actors,
    };
  }

  /**
   * Map TVShow entity to ContentDetails
   */
  private mapTVShowToContentDetails(tvShow: TVShowDocument): ContentDetails {
    return {
      id: tvShow._id.toString(),
      contentType: ContentType.TVShow,
      title: tvShow.title,
      description: tvShow.description,
      genres: tvShow.genres,
      episodes: tvShow.episodes,
    };
  }
}
