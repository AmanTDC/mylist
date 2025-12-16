import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { CursorPaginationHelper } from '../common/utils/pagination.helper';
import { CursorPaginatedResponse } from '../common/interfaces/paginated-response.interface';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
  ) { }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = new this.movieModel(createMovieDto);
    return movie.save();
  }

  async findAll(filters?: {
    genre?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    cursor?: string;
    limit?: number;
  }): Promise<CursorPaginatedResponse<Movie>> {
    const query: any = {};

    // Apply cursor filter
    if (filters?.cursor) {
      Object.assign(query, CursorPaginationHelper.buildCursorQuery(filters.cursor));
    }

    // Apply other filters
    if (filters?.genre) {
      query.genres = filters.genre;
    }

    if (filters?.search) {
      query.$or = [
        { title: { $regex: filters.search, $options: 'i' } },
        { description: { $regex: filters.search, $options: 'i' } },
      ];
    }

    const sort: any = {};
    if (filters?.sortBy) {
      sort[filters.sortBy] = filters.sortOrder === 'desc' ? -1 : 1;
    } else {
      sort._id = 1; // Default: sort by _id for consistent cursor pagination
    }

    const limit = filters?.limit || 20;

    // Fetch one extra item to check if there are more results
    const data = await this.movieModel
      .find(query)
      .sort(sort)
      .limit(limit + 1)
      .exec();

    return CursorPaginationHelper.createCursorPaginatedResponse(
      data,
      limit,
      filters?.cursor,
    );
  }

  async findOne(id: string): Promise<Movie | null> {
    return this.movieModel.findById(id).exec();
  }

  async update(
    id: string,
    updateMovieDto: UpdateMovieDto,
  ): Promise<Movie | null> {
    return this.movieModel
      .findByIdAndUpdate(id, updateMovieDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Movie | null> {
    return this.movieModel.findByIdAndDelete(id).exec();
  }
}
