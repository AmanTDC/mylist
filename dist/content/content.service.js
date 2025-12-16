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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentService = void 0;
const common_1 = require("@nestjs/common");
const movies_service_1 = require("../movies/movies.service");
const tvshows_service_1 = require("../tvshows/tvshows.service");
let ContentService = class ContentService {
    moviesService;
    tvshowsService;
    constructor(moviesService, tvshowsService) {
        this.moviesService = moviesService;
        this.tvshowsService = tvshowsService;
    }
    async findAll(filters) {
        const limit = filters?.limit || 20;
        if (filters?.type === 'movie') {
            return this.moviesService.findAll({
                genre: filters?.genre,
                search: filters?.search,
                cursor: filters?.cursor,
                limit,
            });
        }
        if (filters?.type === 'tvshow') {
            return this.tvshowsService.findAll({
                genre: filters?.genre,
                search: filters?.search,
                cursor: filters?.cursor,
                limit,
            });
        }
        const movieResults = await this.moviesService.findAll({
            genre: filters?.genre,
            search: filters?.search,
            limit: Math.ceil(limit / 2),
        });
        const tvShowResults = await this.tvshowsService.findAll({
            genre: filters?.genre,
            search: filters?.search,
            limit: Math.ceil(limit / 2),
        });
        const combinedData = [
            ...movieResults.data.map((movie) => ({
                ...JSON.parse(JSON.stringify(movie)),
                contentType: 'Movie',
            })),
            ...tvShowResults.data.map((tvshow) => ({
                ...JSON.parse(JSON.stringify(tvshow)),
                contentType: 'TVShow',
            })),
        ];
        return {
            data: combinedData,
            pagination: {
                nextCursor: null,
                prevCursor: null,
                hasNext: movieResults.pagination.hasNext || tvShowResults.pagination.hasNext,
                hasPrev: false,
                limit,
            },
        };
    }
    async findOne(id, type) {
        if (type === 'movie') {
            const movie = await this.moviesService.findOne(id);
            return movie
                ? { ...JSON.parse(JSON.stringify(movie)), contentType: 'Movie' }
                : null;
        }
        else {
            const tvshow = await this.tvshowsService.findOne(id);
            return tvshow
                ? { ...JSON.parse(JSON.stringify(tvshow)), contentType: 'TVShow' }
                : null;
        }
    }
};
exports.ContentService = ContentService;
exports.ContentService = ContentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [movies_service_1.MoviesService,
        tvshows_service_1.TvshowsService])
], ContentService);
//# sourceMappingURL=content.service.js.map