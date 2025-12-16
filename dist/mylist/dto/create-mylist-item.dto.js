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
exports.CreateMyListItemDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const mylist_entity_1 = require("../entities/mylist.entity");
class CreateMyListItemDto {
    userId;
    contentId;
    contentType;
    notes;
    priority;
}
exports.CreateMyListItemDto = CreateMyListItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User ID who is adding the item',
        example: '507f1f77bcf86cd799439011'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateMyListItemDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Content ID (Movie or TVShow)',
        example: '507f1f77bcf86cd799439012'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateMyListItemDto.prototype, "contentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Type of content (optional - will be auto-detected if not provided)',
        enum: mylist_entity_1.ContentType,
        example: mylist_entity_1.ContentType.Movie
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(mylist_entity_1.ContentType),
    __metadata("design:type", String)
], CreateMyListItemDto.prototype, "contentType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Optional notes about this content',
        example: 'Must watch this weekend!'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMyListItemDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Priority level (1-5, higher is more urgent)',
        minimum: 1,
        maximum: 5,
        example: 5
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], CreateMyListItemDto.prototype, "priority", void 0);
//# sourceMappingURL=create-mylist-item.dto.js.map