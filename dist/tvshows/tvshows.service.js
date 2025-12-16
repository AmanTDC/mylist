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
exports.TvshowsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const tvshow_entity_1 = require("./entities/tvshow.entity");
const pagination_helper_1 = require("../common/utils/pagination.helper");
let TvshowsService = class TvshowsService {
    tvShowModel;
    constructor(tvShowModel) {
        this.tvShowModel = tvShowModel;
    }
    async findAll(filters) {
        const query = {};
        if (filters?.cursor) {
            Object.assign(query, pagination_helper_1.CursorPaginationHelper.buildCursorQuery(filters.cursor));
        }
        if (filters?.genre) {
            query.genres = filters.genre;
        }
        if (filters?.search) {
            query.$or = [
                { title: { $regex: filters.search, $options: 'i' } },
                { description: { $regex: filters.search, $options: 'i' } },
            ];
        }
        const sort = {};
        if (filters?.sortBy) {
            sort[filters.sortBy] = filters.sortOrder === 'desc' ? -1 : 1;
        }
        else {
            sort._id = 1;
        }
        const limit = filters?.limit || 20;
        const data = await this.tvShowModel
            .find(query)
            .sort(sort)
            .limit(limit + 1)
            .exec();
        return pagination_helper_1.CursorPaginationHelper.createCursorPaginatedResponse(data, limit, filters?.cursor);
    }
    async findOne(id) {
        return this.tvShowModel.findById(id).exec();
    }
};
exports.TvshowsService = TvshowsService;
exports.TvshowsService = TvshowsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tvshow_entity_1.TVShow.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TvshowsService);
//# sourceMappingURL=tvshows.service.js.map