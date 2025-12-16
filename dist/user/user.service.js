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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./entities/user.schema");
let UserService = class UserService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getUsersList(queryDto) {
        const { cursor, limit = 10, sortOrder = 'asc' } = queryDto;
        const filter = {};
        if (cursor) {
            if (!mongoose_2.Types.ObjectId.isValid(cursor)) {
                throw new common_1.BadRequestException('Invalid cursor format');
            }
            const sortDirection = sortOrder === 'asc' ? 1 : -1;
            if (sortDirection === -1) {
                filter._id = { $lt: new mongoose_2.Types.ObjectId(cursor) };
            }
            else {
                filter._id = { $gt: new mongoose_2.Types.ObjectId(cursor) };
            }
        }
        const sort = {
            _id: sortOrder === 'asc' ? 1 : -1,
        };
        const users = await this.userModel
            .find(filter)
            .sort(sort)
            .limit(limit + 1)
            .select('-__v')
            .exec();
        const hasNextPage = users.length > limit;
        const resultUsers = hasNextPage ? users.slice(0, limit) : users;
        const nextCursor = hasNextPage && resultUsers.length > 0
            ? resultUsers[resultUsers.length - 1]._id.toString()
            : null;
        return {
            users: resultUsers,
            pagination: {
                nextCursor,
                hasNextPage,
                limit,
            },
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map