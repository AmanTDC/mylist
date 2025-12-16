import { QueryUsersDto } from "src/common/dto/query-users.dto";
import { UserService } from "./user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(queryDto: QueryUsersDto): Promise<{
        success: boolean;
        data: any;
        pagination: {
            nextCursor: any;
            hasNextPage: boolean;
            limit: number;
        };
    }>;
}
