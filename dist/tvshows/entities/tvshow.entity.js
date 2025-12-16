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
exports.TVShowSchema = exports.TVShow = exports.EpisodeSchema = exports.Episode = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const genre_enum_1 = require("../../common/enums/genre.enum");
let Episode = class Episode {
    episodeNumber;
    seasonNumber;
    releaseDate;
    director;
    actors;
};
exports.Episode = Episode;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Episode.prototype, "episodeNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Episode.prototype, "seasonNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Date }),
    __metadata("design:type", Date)
], Episode.prototype, "releaseDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Episode.prototype, "director", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Episode.prototype, "actors", void 0);
exports.Episode = Episode = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Episode);
exports.EpisodeSchema = mongoose_1.SchemaFactory.createForClass(Episode);
let TVShow = class TVShow {
    title;
    description;
    genres;
    episodes;
};
exports.TVShow = TVShow;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TVShow.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TVShow.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], enum: genre_enum_1.Genre, required: true }),
    __metadata("design:type", Array)
], TVShow.prototype, "genres", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.EpisodeSchema], default: [] }),
    __metadata("design:type", Array)
], TVShow.prototype, "episodes", void 0);
exports.TVShow = TVShow = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], TVShow);
exports.TVShowSchema = mongoose_1.SchemaFactory.createForClass(TVShow);
//# sourceMappingURL=tvshow.entity.js.map