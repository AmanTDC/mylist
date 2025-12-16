import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Genre } from '../../common/enums/genre.enum';

export type TVShowDocument = HydratedDocument<TVShow>;

@Schema({ _id: false })
export class Episode {
    @Prop({ required: true })
    episodeNumber: number;

    @Prop({ required: true })
    seasonNumber: number;

    @Prop({ required: true, type: Date })
    releaseDate: Date;

    @Prop({ required: true })
    director: string;

    @Prop({ type: [String], default: [] })
    actors: string[];
}

export const EpisodeSchema = SchemaFactory.createForClass(Episode);

@Schema({ timestamps: true })
export class TVShow {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type: [String], enum: Genre, required: true })
    genres: Genre[];

    @Prop({ type: [EpisodeSchema], default: [] })
    episodes: Episode[];
}

export const TVShowSchema = SchemaFactory.createForClass(TVShow);
