import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { ContentService } from './content.service';
import { Movie, MovieSchema } from '../movies/entities/movie.entity';
import { TVShow, TVShowSchema } from '../tvshows/entities/tvshow.entity';

@Module({
  imports: [
    ConfigModule,
    CacheModule.register({
      ttl: 86400 * 1000, // Default 24 hours in milliseconds
      max: 1000, // Maximum number of items in cache
    }),
    MongooseModule.forFeature([
      { name: Movie.name, schema: MovieSchema },
      { name: TVShow.name, schema: TVShowSchema },
    ]),
  ],
  providers: [ContentService],
  exports: [ContentService], // Export so MyListService can use it
})
export class ContentModule { }
