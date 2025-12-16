import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type MyListItemDocument = HydratedDocument<MyListItem>;

export enum ContentType {
    Movie = 'Movie',
    TVShow = 'TVShow',
}

@Schema({ timestamps: true })
export class MyListItem {
    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    userId: Types.ObjectId;

    @Prop({ required: true, type: Types.ObjectId })
    contentId: Types.ObjectId;

    @Prop({ required: true, enum: ContentType })
    contentType: ContentType;

    @Prop({ type: Date, default: Date.now })
    addedAt: Date;

    @Prop()
    notes?: string;

    @Prop({ type: Number, min: 1, max: 5 })
    priority?: number; // 1-5, higher = more urgent to watch
}

export const MyListItemSchema = SchemaFactory.createForClass(MyListItem);

// Add indexes for efficient queries
MyListItemSchema.index({ userId: 1 });
MyListItemSchema.index({ contentId: 1 });
MyListItemSchema.index({ userId: 1, contentId: 1 }, { unique: true }); // Prevent duplicates
