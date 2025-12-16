import { Model, Types } from 'mongoose';
import { User } from './entities/user.schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    getUsersList(queryDto: {
        cursor?: string;
        limit?: number;
        sortOrder?: 'asc' | 'desc';
    }): Promise<{
        users: (import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        })[];
        pagination: {
            nextCursor: string | null;
            hasNextPage: boolean;
            limit: number;
        };
    }>;
}
