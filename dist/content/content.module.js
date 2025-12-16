"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const cache_manager_1 = require("@nestjs/cache-manager");
const config_1 = require("@nestjs/config");
const content_service_1 = require("./content.service");
const movie_entity_1 = require("../movies/entities/movie.entity");
const tvshow_entity_1 = require("../tvshows/entities/tvshow.entity");
let ContentModule = class ContentModule {
};
exports.ContentModule = ContentModule;
exports.ContentModule = ContentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            cache_manager_1.CacheModule.register({
                ttl: 86400 * 1000,
                max: 1000,
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: movie_entity_1.Movie.name, schema: movie_entity_1.MovieSchema },
                { name: tvshow_entity_1.TVShow.name, schema: tvshow_entity_1.TVShowSchema },
            ]),
        ],
        providers: [content_service_1.ContentService],
        exports: [content_service_1.ContentService],
    })
], ContentModule);
//# sourceMappingURL=content.module.js.map