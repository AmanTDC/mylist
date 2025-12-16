import { Controller, Get, Post, Delete, Body, Query, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { MylistService } from './mylist.service';
import { CreateMyListItemDto } from './dto/create-mylist-item.dto';
import { QueryMyListDto } from './dto/query-mylist.dto';

@ApiTags('MyList')
@Controller('mylist')
export class MylistController {
    constructor(private readonly mylistService: MylistService) { }

    @Post()
    @ApiOperation({ summary: 'Add an item to user\'s list' })
    @ApiResponse({ status: 201, description: 'Item added successfully' })
    @ApiResponse({ status: 409, description: 'Item already exists in the list' })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    async addItem(@Body() createDto: CreateMyListItemDto) {
        const item = await this.mylistService.addItemToList(createDto);
        return {
            success: true,
            message: 'Item added to your list',
            data: item,
        };
    }

    @Get()
    @ApiOperation({ summary: 'Get user\'s list with cursor pagination' })
    @ApiResponse({ status: 200, description: 'List retrieved successfully' })
    @ApiResponse({ status: 400, description: 'Invalid query parameters' })
    async getList(@Query() queryDto: QueryMyListDto) {
        const result = await this.mylistService.getUserList(queryDto);
        return {
            success: true,
            data: result.items,
            pagination: result.pagination,
        };
    }

    @Delete(':itemId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Remove an item from user\'s list' })
    @ApiQuery({ name: 'userId', required: true, description: 'User ID' })
    @ApiResponse({ status: 200, description: 'Item removed successfully' })
    @ApiResponse({ status: 404, description: 'Item not found' })
    @ApiResponse({ status: 400, description: 'Invalid item ID' })
    async removeItem(
        @Param('itemId') itemId: string,
        @Query('userId') userId: string,
    ) {
        await this.mylistService.removeItemFromList(userId, itemId);
        return {
            success: true,
            message: 'Item removed from your list',
        };
    }
}
