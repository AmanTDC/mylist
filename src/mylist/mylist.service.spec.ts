import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { MylistService } from './mylist.service';
import { MyListItem, ContentType } from './entities/mylist.entity';
import { ContentService } from '../content/content.service';
import { Types } from 'mongoose';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('MylistService', () => {
    let service: MylistService;
    let model: any;
    let contentService: ContentService;

    const mockMyListItem = {
        _id: new Types.ObjectId(),
        userId: new Types.ObjectId(),
        contentId: new Types.ObjectId(),
        contentType: ContentType.Movie,
        notes: 'Test note',
        priority: 1,
        addedAt: new Date(),
        toObject: jest.fn().mockReturnThis(),
    };

    const mockContentDetails = {
        id: mockMyListItem.contentId.toString(),
        contentType: ContentType.Movie,
        title: 'Test Movie',
        description: 'Test Description',
        genres: ['Action'],
    };

    const mockMyListItemModel = {
        create: jest.fn(),
        find: jest.fn(),
        deleteOne: jest.fn(),
    };

    const mockContentService = {
        getContentById: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MylistService,
                {
                    provide: getModelToken(MyListItem.name),
                    useValue: mockMyListItemModel,
                },
                {
                    provide: ContentService,
                    useValue: mockContentService,
                },
            ],
        }).compile();

        service = module.get<MylistService>(MylistService);
        model = module.get(getModelToken(MyListItem.name));
        contentService = module.get<ContentService>(ContentService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('addItemToList', () => {
        it('should add an item successfully', async () => {
            mockContentService.getContentById.mockResolvedValue(mockContentDetails);
            mockMyListItemModel.create.mockResolvedValue(mockMyListItem);

            const createDto = {
                userId: mockMyListItem.userId.toString(),
                contentId: mockMyListItem.contentId.toString(),
                notes: 'Test note',
                priority: 1,
            };

            const result = await service.addItemToList(createDto);

            expect(contentService.getContentById).toHaveBeenCalledWith(createDto.contentId);
            expect(model.create).toHaveBeenCalled();
            expect(result).toHaveProperty('title', mockContentDetails.title);
        });

        it('should throw ConflictException if item already exists', async () => {
            mockContentService.getContentById.mockResolvedValue(mockContentDetails);
            mockMyListItemModel.create.mockRejectedValue({ code: 11000 });

            const createDto = {
                userId: mockMyListItem.userId.toString(),
                contentId: mockMyListItem.contentId.toString(),
            };

            await expect(service.addItemToList(createDto)).rejects.toThrow(ConflictException);
        });
    });

    describe('getUserList', () => {
        it('should return paginated list with content details', async () => {
            const mockQuery = {
                exec: jest.fn().mockResolvedValue([mockMyListItem]),
                sort: jest.fn().mockReturnThis(),
                limit: jest.fn().mockReturnThis(),
            };
            mockMyListItemModel.find.mockReturnValue(mockQuery);
            mockContentService.getContentById.mockResolvedValue(mockContentDetails);

            const result = await service.getUserList({ userId: mockMyListItem.userId.toString() });

            expect(model.find).toHaveBeenCalled();
            expect(contentService.getContentById).toHaveBeenCalledWith(mockMyListItem.contentId.toString());
            expect(result.items[0]).toHaveProperty('title', mockContentDetails.title);
            expect(result.pagination.hasNextPage).toBe(false);
        });

        it('should handle content fetch errors gracefully', async () => {
            const mockQuery = {
                exec: jest.fn().mockResolvedValue([mockMyListItem]),
                sort: jest.fn().mockReturnThis(),
                limit: jest.fn().mockReturnThis(),
            };
            mockMyListItemModel.find.mockReturnValue(mockQuery);
            mockContentService.getContentById.mockRejectedValue(new NotFoundException());

            const result = await service.getUserList({ userId: mockMyListItem.userId.toString() });

            expect(result.items[0].title).toBeNull();
        });
    });

    describe('removeItemFromList', () => {
        it('should remove an item successfully', async () => {
            mockMyListItemModel.deleteOne.mockResolvedValue({ deletedCount: 1 });

            await service.removeItemFromList(
                mockMyListItem.userId.toString(),
                mockMyListItem._id.toString()
            );

            expect(model.deleteOne).toHaveBeenCalled();
        });

        it('should throw NotFoundException if item not found', async () => {
            mockMyListItemModel.deleteOne.mockResolvedValue({ deletedCount: 0 });

            await expect(
                service.removeItemFromList(
                    mockMyListItem.userId.toString(),
                    mockMyListItem._id.toString()
                )
            ).rejects.toThrow(NotFoundException);
        });
    });
});
