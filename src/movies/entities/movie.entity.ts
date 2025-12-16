import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Genre } from '../../common/enums/genre.enum';

export type MovieDocument = HydratedDocument<Movie>;

@Schema({ timestamps: true })
export class Movie {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type: [String], enum: Genre, required: true })
    genres: Genre[];

    @Prop({ required: true, type: Date })
    releaseDate: Date;

    @Prop({ required: true })
    director: string;

    @Prop({ type: [String], default: [] })
    actors: string[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
