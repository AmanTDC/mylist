import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Genre } from '../common/enums/genre.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ _id: false })
export class Preferences {
    @Prop({ type: [String], enum: Genre, default: [] })
    favoriteGenres: Genre[];

    @Prop({ type: [String], enum: Genre, default: [] })
    dislikedGenres: Genre[];
}

export const PreferencesSchema = SchemaFactory.createForClass(Preferences);

@Schema({ _id: false })
export class WatchHistoryItem {
    @Prop({ required: true })
    contentId: string;

    @Prop({ required: true, type: Date })
    watchedOn: Date;

    @Prop({ type: Number, min: 1, max: 5 })
    rating?: number;
}

export const WatchHistoryItemSchema = SchemaFactory.createForClass(WatchHistoryItem);

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ type: PreferencesSchema, default: () => ({}) })
    preferences: Preferences;

    @Prop({ type: [WatchHistoryItemSchema], default: [] })
    watchHistory: WatchHistoryItem[];
}

export const UserSchema = SchemaFactory.createForClass(User);
