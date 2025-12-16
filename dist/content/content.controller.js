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
exports.ContentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const content_service_1 = require("./content.service");
const pagination_dto_1 = require("../common/dto/pagination.dto");
let ContentController = class ContentController {
    contentService;
    constructor(contentService) {
        this.contentService = contentService;
    }
    findAll(paginationDto, type, genre, search) {
        return this.contentService.findAll({
            type,
            genre,
            search,
            cursor: paginationDto.cursor,
            limit: paginationDto.limit,
        });
    }
    findOne(id, type) {
        return this.contentService.findOne(id, type);
    }
};
exports.ContentController = ContentController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all content (movies + TV shows) with cursor pagination' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns paginated list of combined content',
    }),
    (0, swagger_1.ApiQuery)({ name: 'type', required: false, enum: ['movie', 'tvshow'], description: 'Filter by content type' }),
    (0, swagger_1.ApiQuery)({ name: 'genre', required: false, enum: ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'SciFi'] }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, description: 'Search by title or description' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)('type')),
    __param(2, (0, common_1.Query)('genre')),
    __param(3, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.CursorPaginationDto, String, String, String]),
    __metadata("design:returntype", void 0)
], ContentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':type/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a single content item by type and ID' }),
    (0, swagger_1.ApiParam)({ name: 'type', enum: ['movie', 'tvshow'], description: 'Content type' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Content ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns the content item' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Content not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ContentController.prototype, "findOne", null);
exports.ContentController = ContentController = __decorate([
    (0, swagger_1.ApiTags)('content'),
    (0, common_1.Controller)('content'),
    __metadata("design:paramtypes", [content_service_1.ContentService])
], ContentController);
//# sourceMappingURL=content.controller.js.map