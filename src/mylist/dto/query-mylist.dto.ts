import { IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ContentType } from '../entities/mylist.entity';
import { Type } from 'class-transformer';

export class QueryMyListDto {
    @ApiProperty({
        description: 'User ID whose list to retrieve',
        example: '507f1f77bcf86cd799439011'
    })
    @IsNotEmpty()
    @IsMongoId()
    userId: string;

    @ApiPropertyOptional({
        description: 'Filter by content type',
        enum: ContentType
    })
    @IsOptional()
    @IsEnum(ContentType)
    contentType?: ContentType;

    @ApiPropertyOptional({
        description: 'Sort by field',
        enum: ['addedAt', 'priority'],
        default: 'addedAt'
    })
    @IsOptional()
    @IsString()
    sortBy?: 'addedAt' | 'priority';

    @ApiPropertyOptional({
        description: 'Sort order',
        enum: ['asc', 'desc'],
        default: 'desc'
    })
    @IsOptional()
    @IsEnum(['asc', 'desc'])
    sortOrder?: 'asc' | 'desc';

    @ApiPropertyOptional({
        description: 'Cursor for pagination (ID of the last item from previous page)',
        example: '507f1f77bcf86cd799439013'
    })
    @IsOptional()
    @IsMongoId()
    cursor?: string;

    @ApiPropertyOptional({
        description: 'Number of items to return',
        minimum: 1,
        maximum: 100,
        default: 10
    })
    @IsOptional()
    @Type(() => Number)
    @Min(1)
    @Max(100)
    limit?: number;
}
