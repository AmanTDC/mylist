import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { MoviesModule } from './movies/movies.module';
import { TvshowsModule } from './tvshows/tvshows.module';
import { CommonModule } from './common/common.module';
import { MylistModule } from './mylist/mylist.module';
import { UserModule } from './user/user.module';
import { MyListItem, MyListItemSchema } from './mylist/entities/mylist.entity';
import { ContentModule } from './content/content.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: MyListItem.name, schema: MyListItemSchema },
    ]),
    MoviesModule,
    TvshowsModule,
    CommonModule,
    MylistModule,
    UserModule,
    ContentModule,
  ],
  controllers: [AppController],
})
export class AppModule { }
