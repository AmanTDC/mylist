import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TvshowsService } from './tvshows.service';
import { TvshowsController } from './tvshows.controller';
import { TVShow, TVShowSchema } from './entities/tvshow.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TVShow.name, schema: TVShowSchema }]),
  ],
  controllers: [TvshowsController],
  providers: [TvshowsService],
  exports: [TvshowsService, MongooseModule],
})
export class TvshowsModule { }
