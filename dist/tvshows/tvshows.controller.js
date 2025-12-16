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
exports.TvshowsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tvshows_service_1 = require("./tvshows.service");
const pagination_dto_1 = require("../common/dto/pagination.dto");
let TvshowsController = class TvshowsController {
    tvshowsService;
    constructor(tvshowsService) {
        this.tvshowsService = tvshowsService;
    }
    findAll(paginationDto) {
        return this.tvshowsService.findAll({
            cursor: paginationDto.cursor,
            limit: paginationDto.limit,
        });
    }
    findOne(id) {
        return this.tvshowsService.findOne(id);
    }
    remove(id) {
        return this.tvshowsService.remove(id);
    }
};
exports.TvshowsController = TvshowsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns paginated list of TV shows',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.CursorPaginationDto]),
    __metadata("design:returntype", void 0)
], TvshowsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns the TV show' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'TV show not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TvshowsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'TV show deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'TV show not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TvshowsController.prototype, "remove", null);
exports.TvshowsController = TvshowsController = __decorate([
    (0, swagger_1.ApiTags)('tvshows'),
    (0, common_1.Controller)('tvshows'),
    __metadata("design:paramtypes", [tvshows_service_1.TvshowsService])
], TvshowsController);
//# sourceMappingURL=tvshows.controller.js.map