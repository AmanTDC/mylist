import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MyListItem, MyListItemDocument } from './entities/mylist.entity';
import { CreateMyListItemDto } from './dto/create-mylist-item.dto';
import { QueryMyListDto } from './dto/query-mylist.dto';

@Injectable()
export class MylistService {
    constructor(
        @InjectModel(MyListItem.name) private myListItemModel: Model<MyListItemDocument>,
    ) { }

    /**
     * Add an item to user's list
     * Prevents duplicates via unique index
     */
    async addItemToList(createDto: CreateMyListItemDto): Promise<MyListItemDocument> {
        try {
            const item = await this.myListItemModel.create({
                userId: new Types.ObjectId(createDto.userId),
                contentId: new Types.ObjectId(createDto.contentId),
                contentType: createDto.contentType,
                notes: createDto.notes,
                priority: createDto.priority,
                addedAt: new Date(),
            });
            return item;
        } catch (error) {
            // Handle duplicate key error (unique index on userId + contentId)
            if (error.code === 11000) {
                throw new ConflictException('This item is already in your list');
            }
            throw error;
        }
    }

    /**
     * Get user's list with cursor pagination, filtering, and sorting
     */
    async getUserList(queryDto: QueryMyListDto) {
        const {
            userId,
            contentType,
            sortBy = 'addedAt',
            sortOrder = 'desc',
            cursor,
            limit = 10,
        } = queryDto;

        // Build filter
        const filter: any = { userId: new Types.ObjectId(userId) };
        if (contentType) {
            filter.contentType = contentType;
        }

        // Add cursor condition for pagination
        if (cursor) {
            if (!Types.ObjectId.isValid(cursor)) {
                throw new BadRequestException('Invalid cursor format');
            }

            // Fetch one more item to determine if there's a next page
            const sortDirection = sortOrder === 'asc' ? 1 : -1;

            if (sortDirection === -1) {
                filter._id = { $lt: new Types.ObjectId(cursor) };
            } else {
                filter._id = { $gt: new Types.ObjectId(cursor) };
            }
        }

        // Build sort
        const sort: any = {};
        sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
        // Always include _id as secondary sort for consistent cursor pagination
        sort._id = sortOrder === 'asc' ? 1 : -1;

        // Fetch limit + 1 to check if there's a next page
        const items = await this.myListItemModel
            .find(filter)
            .sort(sort)
            .limit(limit + 1)
            .exec();

        // Determine if there's a next page
        const hasNextPage = items.length > limit;
        const resultItems = hasNextPage ? items.slice(0, limit) : items;

        // Get the cursor for the next page
        const nextCursor = hasNextPage && resultItems.length > 0
            ? resultItems[resultItems.length - 1]._id.toString()
            : null;

        return {
            items: resultItems,
            pagination: {
                nextCursor,
                hasNextPage,
                limit,
            },
        };
    }

    /**
     * Remove an item from user's list
     */
    async removeItemFromList(userId: string, itemId: string): Promise<void> {
        if (!Types.ObjectId.isValid(itemId)) {
            throw new BadRequestException('Invalid item ID format');
        }

        const result = await this.myListItemModel.deleteOne({
            _id: new Types.ObjectId(itemId),
            userId: new Types.ObjectId(userId),
        });

        if (result.deletedCount === 0) {
            throw new NotFoundException('Item not found in your list or you do not have permission to delete it');
        }
    }

    /**
     * Check if an item exists in user's list
     */
    async isItemInList(userId: string, contentId: string): Promise<boolean> {
        const item = await this.myListItemModel.findOne({
            userId: new Types.ObjectId(userId),
            contentId: new Types.ObjectId(contentId),
        });
        return !!item;
    }
}
