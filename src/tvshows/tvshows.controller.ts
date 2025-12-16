import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { TvshowsService } from './tvshows.service';
import { CursorPaginationDto } from '../common/dto/pagination.dto';

@ApiTags('tvshows')
@Controller('tvshows')
export class TvshowsController {
  constructor(private readonly tvshowsService: TvshowsService) { }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns paginated list of TV shows',
  })
  findAll(
    @Query() paginationDto: CursorPaginationDto,
  ) {
    return this.tvshowsService.findAll({
      cursor: paginationDto.cursor,
      limit: paginationDto.limit,
    });
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Returns the TV show' })
  @ApiResponse({ status: 404, description: 'TV show not found' })
  findOne(@Param('id') id: string) {
    return this.tvshowsService.findOne(id);
  }


}
