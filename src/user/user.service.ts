import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './entities/user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) { }

    /**
     * Get all users with cursor pagination
     */
    async getUsersList(queryDto: { cursor?: string; limit?: number; sortOrder?: 'asc' | 'desc' }) {
        const { cursor, limit = 10, sortOrder = 'asc' } = queryDto;

        // Build filter
        const filter: any = {};

        // Add cursor condition for pagination
        if (cursor) {
            if (!Types.ObjectId.isValid(cursor)) {
                throw new BadRequestException('Invalid cursor format');
            }

            const sortDirection = sortOrder === 'asc' ? 1 : -1;

            if (sortDirection === -1) {
                filter._id = { $lt: new Types.ObjectId(cursor) };
            } else {
                filter._id = { $gt: new Types.ObjectId(cursor) };
            }
        }

        // Build sort
        const sort: any = {
            _id: sortOrder === 'asc' ? 1 : -1,
        };

        // Fetch limit + 1 to check if there's a next page
        const users = await this.userModel
            .find(filter)
            .sort(sort)
            .limit(limit + 1)
            .select('-__v') // Exclude version field
            .exec();

        // Determine if there's a next page
        const hasNextPage = users.length > limit;
        const resultUsers = hasNextPage ? users.slice(0, limit) : users;

        // Get the cursor for the next page
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
}
