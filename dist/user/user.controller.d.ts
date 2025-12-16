import { QueryUsersDto } from "src/common/dto/query-users.dto";
import { UserService } from "./user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(queryDto: QueryUsersDto): Promise<{
        success: boolean;
        data: (import("mongoose").Document<unknown, {}, import("./entities/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("./entities/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
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
