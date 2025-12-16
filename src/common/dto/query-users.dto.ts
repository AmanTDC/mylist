import { IsEnum, IsMongoId, IsOptional, Max, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class QueryUsersDto {
    @ApiPropertyOptional({
        description: 'Cursor for pagination (ID of the last user from previous page)',
        example: '507f1f77bcf86cd799439013'
    })
    @IsOptional()
    @IsMongoId()
    cursor?: string;

    @ApiPropertyOptional({
        description: 'Number of users to return',
        minimum: 1,
        maximum: 100,
        default: 10
    })
    @IsOptional()
    @Type(() => Number)
    @Min(1)
    @Max(100)
    limit?: number;

    @ApiPropertyOptional({
        description: 'Sort order',
        enum: ['asc', 'desc'],
        default: 'asc'
    })
    @IsOptional()
    @IsEnum(['asc', 'desc'])
    sortOrder?: 'asc' | 'desc';
}
