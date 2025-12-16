import { Controller, Get, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { QueryUsersDto } from "src/common/dto/query-users.dto";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @ApiOperation({ summary: 'Get all users with cursor pagination' })
    @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
    @ApiResponse({ status: 400, description: 'Invalid query parameters' })
    async getUsers(@Query() queryDto: QueryUsersDto) {
        const result = await this.userService.getUsersList(queryDto);
        return {
            success: true,
            data: result.users,
            pagination: result.pagination,
        };
    }
}
