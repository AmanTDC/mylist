import {
    Controller,
    Get,
    Query,
    Param,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiQuery,
    ApiParam,
} from '@nestjs/swagger';
import { ContentService } from './content.service';
import { CursorPaginationDto } from '../common/dto/pagination.dto';

@ApiTags('content')
@Controller('content')
export class ContentController {
    constructor(private readonly contentService: ContentService) { }

    @Get()
    @ApiOperation({ summary: 'Get all content (movies + TV shows) with cursor pagination' })
    @ApiResponse({
        status: 200,
        description: 'Returns paginated list of combined content',
    })
    @ApiQuery({ name: 'type', required: false, enum: ['movie', 'tvshow'], description: 'Filter by content type' })
    @ApiQuery({ name: 'genre', required: false, enum: ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'SciFi'] })
    @ApiQuery({ name: 'search', required: false, description: 'Search by title or description' })
    findAll(
        @Query() paginationDto: CursorPaginationDto,
        @Query('type') type?: 'movie' | 'tvshow',
        @Query('genre') genre?: string,
        @Query('search') search?: string,
    ) {
        return this.contentService.findAll({
            type,
            genre,
            search,
            cursor: paginationDto.cursor,
            limit: paginationDto.limit,
        });
    }

    @Get(':type/:id')
    @ApiOperation({ summary: 'Get a single content item by type and ID' })
    @ApiParam({ name: 'type', enum: ['movie', 'tvshow'], description: 'Content type' })
    @ApiParam({ name: 'id', description: 'Content ID' })
    @ApiResponse({ status: 200, description: 'Returns the content item' })
    @ApiResponse({ status: 404, description: 'Content not found' })
    findOne(
        @Param('id') id: string,
        @Param('type') type: 'movie' | 'tvshow',
    ) {
        return this.contentService.findOne(id, type);
    }
}
