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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const movie_entity_1 = require("./movies/entities/movie.entity");
const tvshow_entity_1 = require("./tvshows/entities/tvshow.entity");
let AppService = class AppService {
    movieModel;
    tvShowModel;
    constructor(movieModel, tvShowModel) {
        this.movieModel = movieModel;
        this.tvShowModel = tvShowModel;
    }
    getHello() {
        return 'Hello World!';
    }
    async createMovie(movieData) {
        const movie = new this.movieModel(movieData);
        return movie.save();
    }
    async getMoviesByGenre(genre) {
        return this.movieModel.find({ genres: genre }).exec();
    }
    async createTVShow(tvShowData) {
        const tvShow = new this.tvShowModel(tvShowData);
        return tvShow.save();
    }
    async addEpisode(tvShowId, episodeData) {
        return this.tvShowModel.findByIdAndUpdate(tvShowId, {
            $push: {
                episodes: episodeData,
            },
        }, { new: true });
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(movie_entity_1.Movie.name)),
    __param(1, (0, mongoose_1.InjectModel)(tvshow_entity_1.TVShow.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], AppService);
//# sourceMappingURL=app.service.js.map