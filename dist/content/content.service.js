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
exports.ContentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cache_manager_1 = require("@nestjs/cache-manager");
const movie_entity_1 = require("../movies/entities/movie.entity");
const tvshow_entity_1 = require("../tvshows/entities/tvshow.entity");
const mylist_entity_1 = require("../mylist/entities/mylist.entity");
const config_1 = require("@nestjs/config");
let ContentService = class ContentService {
    movieModel;
    tvShowModel;
    cacheManager;
    configService;
    cacheTTL;
    constructor(movieModel, tvShowModel, cacheManager, configService) {
        this.movieModel = movieModel;
        this.tvShowModel = tvShowModel;
        this.cacheManager = cacheManager;
        this.configService = configService;
        this.cacheTTL = this.configService.get('CONTENT_CACHE_TTL', 86400);
    }
    async getContentById(contentId) {
        if (!mongoose_2.Types.ObjectId.isValid(contentId)) {
            throw new common_1.NotFoundException(`Invalid content ID: ${contentId}`);
        }
        const cacheKey = `content:${contentId}`;
        const cached = await this.cacheManager.get(cacheKey);
        if (cached) {
            return cached;
        }
        const movie = await this.movieModel.findById(contentId).exec();
        if (movie) {
            const contentDetails = this.mapMovieToContentDetails(movie);
            await this.cacheManager.set(cacheKey, contentDetails, this.cacheTTL * 1000);
            return contentDetails;
        }
        const tvShow = await this.tvShowModel.findById(contentId).exec();
        if (tvShow) {
            const contentDetails = this.mapTVShowToContentDetails(tvShow);
            await this.cacheManager.set(cacheKey, contentDetails, this.cacheTTL * 1000);
            return contentDetails;
        }
        throw new common_1.NotFoundException(`Content with ID ${contentId} not found`);
    }
    async getContentsByIds(contentIds) {
        const promises = contentIds.map(id => this.getContentById(id));
        return Promise.all(promises);
    }
    async invalidateContentCache(contentId) {
        const cacheKey = `content:${contentId}`;
        await this.cacheManager.del(cacheKey);
    }
    mapMovieToContentDetails(movie) {
        return {
            id: movie._id.toString(),
            contentType: mylist_entity_1.ContentType.Movie,
            title: movie.title,
            description: movie.description,
            genres: movie.genres,
            releaseDate: movie.releaseDate,
            director: movie.director,
            actors: movie.actors,
        };
    }
    mapTVShowToContentDetails(tvShow) {
        return {
            id: tvShow._id.toString(),
            contentType: mylist_entity_1.ContentType.TVShow,
            title: tvShow.title,
            description: tvShow.description,
            genres: tvShow.genres,
            episodes: tvShow.episodes,
        };
    }
};
exports.ContentService = ContentService;
exports.ContentService = ContentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(movie_entity_1.Movie.name)),
    __param(1, (0, mongoose_1.InjectModel)(tvshow_entity_1.TVShow.name)),
    __param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model, Object, config_1.ConfigService])
], ContentService);
//# sourceMappingURL=content.service.js.map