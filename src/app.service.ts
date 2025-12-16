import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './movies/entities/movie.entity';
import { TVShow } from './tvshows/entities/tvshow.entity';
import { Genre } from './common/enums/genre.enum';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
    @InjectModel(TVShow.name) private tvShowModel: Model<TVShow>,
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  // Example: Create a movie
  async createMovie(movieData: Partial<Movie>): Promise<Movie> {
    const movie = new this.movieModel(movieData);
    return movie.save();
  }

  // Example: Get movies by genre
  async getMoviesByGenre(genre: Genre): Promise<Movie[]> {
    return this.movieModel.find({ genres: genre }).exec();
  }

  // Example: Create a TV show
  async createTVShow(tvShowData: Partial<TVShow>): Promise<TVShow> {
    const tvShow = new this.tvShowModel(tvShowData);
    return tvShow.save();
  }

  // Example: Add episode to TV show
  async addEpisode(
    tvShowId: string,
    episodeData: {
      episodeNumber: number;
      seasonNumber: number;
      releaseDate: Date;
      director: string;
      actors: string[];
    },
  ): Promise<TVShow | null> {
    return this.tvShowModel.findByIdAndUpdate(
      tvShowId,
      {
        $push: {
          episodes: episodeData,
        },
      },
      { new: true },
    );
  }
}
