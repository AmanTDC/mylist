import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { MoviesModule } from '../movies/movies.module';
import { TvshowsModule } from '../tvshows/tvshows.module';

@Module({
  imports: [MoviesModule, TvshowsModule],
  controllers: [ContentController],
  providers: [ContentService],
  exports: [ContentService],
})
export class ContentModule { }
