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
exports.CreateMovieDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const genre_enum_1 = require("../../common/enums/genre.enum");
class CreateMovieDto {
    title;
    description;
    genres;
    releaseDate;
    director;
    actors;
}
exports.CreateMovieDto = CreateMovieDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Movie title',
        example: 'Inception',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMovieDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Movie description',
        example: 'A thief who steals corporate secrets through dream-sharing technology...',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMovieDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Movie genres',
        enum: genre_enum_1.Genre,
        isArray: true,
        example: ['SciFi', 'Action'],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(genre_enum_1.Genre, { each: true }),
    __metadata("design:type", Array)
], CreateMovieDto.prototype, "genres", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Release date',
        example: '2010-07-16',
        type: Date,
    }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateMovieDto.prototype, "releaseDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Director name',
        example: 'Christopher Nolan',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMovieDto.prototype, "director", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of actors',
        example: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt'],
        required: false,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateMovieDto.prototype, "actors", void 0);
//# sourceMappingURL=create-movie.dto.js.map