import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MyListItem, MyListItemDocument } from './entities/mylist.entity';
import { CreateMyListItemDto } from './dto/create-mylist-item.dto';
import { QueryMyListDto } from './dto/query-mylist.dto';
import { ContentService } from '../content/content.service';

@Injectable()
export class MylistService {
    constructor(
        @InjectModel(MyListItem.name) private myListItemModel: Model<MyListItemDocument>,
        private contentService: ContentService,
    ) { }

    async addItemToList(createDto: CreateMyListItemDto): Promise<any> {
        try {
            const contentDetails = await this.contentService.getContentById(createDto.contentId);
            const contentType = contentDetails.contentType;

            const item = await this.myListItemModel.create({
                userId: new Types.ObjectId(createDto.userId),
                contentId: new Types.ObjectId(createDto.contentId),
                contentType: contentType,
                notes: createDto.notes,
                priority: createDto.priority,
                addedAt: new Date(),
            });

            return {
                ...item.toObject(),
                title: contentDetails.title,
                description: contentDetails.description,
                genres: contentDetails.genres,
            };
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('This item is already in your list');
            }
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw error;
        }
    }

    async getUserList(queryDto: QueryMyListDto) {
        const {
            userId,
            contentType,
            sortBy = 'addedAt',
            sortOrder = 'desc',
            cursor,
            limit = 10,
        } = queryDto;

        const filter: any = { userId: new Types.ObjectId(userId) };
        if (contentType) {
            filter.contentType = contentType;
        }

        if (cursor) {
            if (!Types.ObjectId.isValid(cursor)) {
                throw new BadRequestException('Invalid cursor format');
            }

            const sortDirection = sortOrder === 'asc' ? 1 : -1;

            if (sortDirection === -1) {
                filter._id = { $lt: new Types.ObjectId(cursor) };
            } else {
                filter._id = { $gt: new Types.ObjectId(cursor) };
            }
        }

        const sort: any = {};
        sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
        sort._id = sortOrder === 'asc' ? 1 : -1;

        const items = await this.myListItemModel
            .find(filter)
            .sort(sort)
            .limit(limit + 1)
            .exec();

        const hasNextPage = items.length > limit;
        const resultItems = hasNextPage ? items.slice(0, limit) : items;

        const itemsWithContent = await Promise.all(
            resultItems.map(async (item) => {
                try {
                    const content = await this.contentService.getContentById(item.contentId.toString());
                    return {
                        ...item.toObject(),
                        title: content.title,
                        description: content.description,
                        genres: content.genres,
                    };
                } catch (error) {
                    return {
                        ...item.toObject(),
                        title: null,
                        description: null,
                        genres: [],
                    };
                }
            })
        );

        const nextCursor = hasNextPage && resultItems.length > 0
            ? resultItems[resultItems.length - 1]._id.toString()
            : null;

        return {
            items: itemsWithContent,
            pagination: {
                nextCursor,
                hasNextPage,
                limit,
            },
        };
    }

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
}
