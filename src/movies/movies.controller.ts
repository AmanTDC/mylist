import {
    Controller,
    Get,
    Param,
    Query,
} from '@nestjs/common';
import {
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';
import { CursorPaginationDto } from '../common/dto/pagination.dto';
import { MoviesService } from './movies.service';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) { }



    @Get()
    @ApiOperation({ summary: 'Get all movies with cursor pagination' })
    @ApiResponse({
        status: 200,
        description: 'Returns paginated list of movies',
    })
    findAll(
        @Query() paginationDto: CursorPaginationDto,
    ) {
        return this.moviesService.findAll({
            cursor: paginationDto.cursor,
            limit: paginationDto.limit,
        });
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a movie by ID' })
    @ApiParam({ name: 'id', description: 'Movie ID' })
    @ApiResponse({ status: 200, description: 'Returns the movie' })
    @ApiResponse({ status: 404, description: 'Movie not found' })
    findOne(@Param('id') id: string) {
        return this.moviesService.findOne(id);
    }
}
