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
exports.UserSchema = exports.User = exports.WatchHistoryItemSchema = exports.WatchHistoryItem = exports.PreferencesSchema = exports.Preferences = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const genre_enum_1 = require("../../common/enums/genre.enum");
let Preferences = class Preferences {
    favoriteGenres;
    dislikedGenres;
};
exports.Preferences = Preferences;
__decorate([
    (0, mongoose_1.Prop)({ type: [String], enum: genre_enum_1.Genre, default: [] }),
    __metadata("design:type", Array)
], Preferences.prototype, "favoriteGenres", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], enum: genre_enum_1.Genre, default: [] }),
    __metadata("design:type", Array)
], Preferences.prototype, "dislikedGenres", void 0);
exports.Preferences = Preferences = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Preferences);
exports.PreferencesSchema = mongoose_1.SchemaFactory.createForClass(Preferences);
let WatchHistoryItem = class WatchHistoryItem {
    contentId;
    watchedOn;
    rating;
};
exports.WatchHistoryItem = WatchHistoryItem;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], WatchHistoryItem.prototype, "contentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Date }),
    __metadata("design:type", Date)
], WatchHistoryItem.prototype, "watchedOn", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, min: 1, max: 5 }),
    __metadata("design:type", Number)
], WatchHistoryItem.prototype, "rating", void 0);
exports.WatchHistoryItem = WatchHistoryItem = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], WatchHistoryItem);
exports.WatchHistoryItemSchema = mongoose_1.SchemaFactory.createForClass(WatchHistoryItem);
let User = class User {
    username;
    preferences;
    watchHistory;
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: exports.PreferencesSchema, default: () => ({}) }),
    __metadata("design:type", Preferences)
], User.prototype, "preferences", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.WatchHistoryItemSchema], default: [] }),
    __metadata("design:type", Array)
], User.prototype, "watchHistory", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.schema.js.map