import { HydratedDocument } from 'mongoose';
import { Genre } from '../common/enums/genre.enum';
export type UserDocument = HydratedDocument<User>;
export declare class Preferences {
    favoriteGenres: Genre[];
    dislikedGenres: Genre[];
}
export declare const PreferencesSchema: any;
export declare class WatchHistoryItem {
    contentId: string;
    watchedOn: Date;
    rating?: number;
}
export declare const WatchHistoryItemSchema: any;
export declare class User {
    username: string;
    preferences: Preferences;
    watchHistory: WatchHistoryItem[];
}
export declare const UserSchema: any;
