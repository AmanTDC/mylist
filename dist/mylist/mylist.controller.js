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
exports.MylistController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const mylist_service_1 = require("./mylist.service");
const create_mylist_item_dto_1 = require("./dto/create-mylist-item.dto");
const query_mylist_dto_1 = require("./dto/query-mylist.dto");
let MylistController = class MylistController {
    mylistService;
    constructor(mylistService) {
        this.mylistService = mylistService;
    }
    async addItem(createDto) {
        const item = await this.mylistService.addItemToList(createDto);
        return {
            success: true,
            message: 'Item added to your list',
            data: item,
        };
    }
    async getList(queryDto) {
        const result = await this.mylistService.getUserList(queryDto);
        return {
            success: true,
            data: result.items,
            pagination: result.pagination,
        };
    }
    async removeItem(itemId, userId) {
        await this.mylistService.removeItemFromList(userId, itemId);
        return {
            success: true,
            message: 'Item removed from your list',
        };
    }
};
exports.MylistController = MylistController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Add an item to user\'s list' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Item added successfully' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Item already exists in the list' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_mylist_item_dto_1.CreateMyListItemDto]),
    __metadata("design:returntype", Promise)
], MylistController.prototype, "addItem", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get user\'s list with cursor pagination' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid query parameters' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_mylist_dto_1.QueryMyListDto]),
    __metadata("design:returntype", Promise)
], MylistController.prototype, "getList", null);
__decorate([
    (0, common_1.Delete)(':itemId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Remove an item from user\'s list' }),
    (0, swagger_1.ApiQuery)({ name: 'userId', required: true, description: 'User ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Item removed successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Item not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid item ID' }),
    __param(0, (0, common_1.Param)('itemId')),
    __param(1, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MylistController.prototype, "removeItem", null);
exports.MylistController = MylistController = __decorate([
    (0, swagger_1.ApiTags)('MyList'),
    (0, common_1.Controller)('mylist'),
    __metadata("design:paramtypes", [mylist_service_1.MylistService])
], MylistController);
//# sourceMappingURL=mylist.controller.js.map