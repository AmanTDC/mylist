import { Model } from 'mongoose';
import { User } from './entities/user.schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    getUsersList(queryDto: {
        cursor?: string;
        limit?: number;
        sortOrder?: 'asc' | 'desc';
    }): Promise<{
        users: any;
        pagination: {
            nextCursor: any;
            hasNextPage: boolean;
            limit: number;
        };
    }>;
}
