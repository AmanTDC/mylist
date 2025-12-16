"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MylistService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mylist_entity_1 = require("./entities/mylist.entity");
const content_service_1 = require("../content/content.service");
let MylistService = class MylistService {
    myListItemModel;
    contentService;
    constructor(myListItemModel, contentService) {
        this.myListItemModel = myListItemModel;
        this.contentService = contentService;
    }
    async addItemToList(createDto) {
        try {
            const contentDetails = await this.contentService.getContentById(createDto.contentId);
            const contentType = contentDetails.contentType;
            const item = await this.myListItemModel.create({
                userId: new mongoose_2.Types.ObjectId(createDto.userId),
                contentId: new mongoose_2.Types.ObjectId(createDto.contentId),
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
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.ConflictException('This item is already in your list');
            }
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw error;
        }
    }
    async getUserList(queryDto) {
        const { userId, contentType, sortBy = 'addedAt', sortOrder = 'desc', cursor, limit = 10, } = queryDto;
        const filter = { userId: new mongoose_2.Types.ObjectId(userId) };
        if (contentType) {
            filter.contentType = contentType;
        }
        if (cursor) {
            if (!mongoose_2.Types.ObjectId.isValid(cursor)) {
                throw new common_1.BadRequestException('Invalid cursor format');
            }
            const sortDirection = sortOrder === 'asc' ? 1 : -1;
            if (sortDirection === -1) {
                filter._id = { $lt: new mongoose_2.Types.ObjectId(cursor) };
            }
            else {
                filter._id = { $gt: new mongoose_2.Types.ObjectId(cursor) };
            }
        }
        const sort = {};
        sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
        sort._id = sortOrder === 'asc' ? 1 : -1;
        const items = await this.myListItemModel
            .find(filter)
            .sort(sort)
            .limit(limit + 1)
            .exec();
        const hasNextPage = items.length > limit;
        const resultItems = hasNextPage ? items.slice(0, limit) : items;
        const itemsWithContent = await Promise.all(resultItems.map(async (item) => {
            try {
                const content = await this.contentService.getContentById(item.contentId.toString());
                return {
                    ...item.toObject(),
                    title: content.title,
                    description: content.description,
                    genres: content.genres,
                };
            }
            catch (error) {
                return {
                    ...item.toObject(),
                    title: null,
                    description: null,
                    genres: [],
                };
            }
        }));
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
    async removeItemFromList(userId, itemId) {
        if (!mongoose_2.Types.ObjectId.isValid(itemId)) {
            throw new common_1.BadRequestException('Invalid item ID format');
        }
        const result = await this.myListItemModel.deleteOne({
            _id: new mongoose_2.Types.ObjectId(itemId),
            userId: new mongoose_2.Types.ObjectId(userId),
        });
        if (result.deletedCount === 0) {
            throw new common_1.NotFoundException('Item not found in your list or you do not have permission to delete it');
        }
    }
};
exports.MylistService = MylistService;
exports.MylistService = MylistService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(mylist_entity_1.MyListItem.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        content_service_1.ContentService])
], MylistService);
//# sourceMappingURL=mylist.service.js.map