import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { ContentModule } from './content/content.module';
import { TvshowsModule } from './tvshows/tvshows.module';
import { CommonModule } from './common/common.module';
import { MylistModule } from './mylist/mylist.module';
import { UserModule } from './user/user.module';
import { MyListItem, MyListItemSchema } from './mylist/entities/mylist.entity';

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
    ContentModule,
    CommonModule,
    MylistModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
