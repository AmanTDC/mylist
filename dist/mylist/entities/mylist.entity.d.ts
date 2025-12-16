import { HydratedDocument, Types } from 'mongoose';
export type MyListItemDocument = HydratedDocument<MyListItem>;
export declare enum ContentType {
    Movie = "Movie",
    TVShow = "TVShow"
}
export declare class MyListItem {
    userId: Types.ObjectId;
    contentId: Types.ObjectId;
    contentType: ContentType;
    addedAt: Date;
    notes?: string;
    priority?: number;
}
export declare const MyListItemSchema: any;
