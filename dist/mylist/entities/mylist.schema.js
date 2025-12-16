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
exports.MyListItemSchema = exports.MyListItem = exports.ContentType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var ContentType;
(function (ContentType) {
    ContentType["Movie"] = "Movie";
    ContentType["TVShow"] = "TVShow";
})(ContentType || (exports.ContentType = ContentType = {}));
let MyListItem = class MyListItem {
    userId;
    contentId;
    contentType;
    addedAt;
    notes;
    priority;
};
exports.MyListItem = MyListItem;
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], MyListItem.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.Types.ObjectId }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], MyListItem.prototype, "contentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ContentType }),
    __metadata("design:type", String)
], MyListItem.prototype, "contentType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], MyListItem.prototype, "addedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], MyListItem.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, min: 1, max: 5 }),
    __metadata("design:type", Number)
], MyListItem.prototype, "priority", void 0);
exports.MyListItem = MyListItem = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], MyListItem);
exports.MyListItemSchema = mongoose_1.SchemaFactory.createForClass(MyListItem);
exports.MyListItemSchema.index({ userId: 1 });
exports.MyListItemSchema.index({ contentId: 1 });
exports.MyListItemSchema.index({ userId: 1, contentId: 1 }, { unique: true });
//# sourceMappingURL=mylist.schema.js.map