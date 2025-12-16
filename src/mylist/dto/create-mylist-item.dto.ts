import { IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ContentType } from '../entities/mylist.entity';

export class CreateMyListItemDto {
    @ApiProperty({
        description: 'User ID who is adding the item',
        example: '507f1f77bcf86cd799439011'
    })
    @IsNotEmpty()
    @IsMongoId()
    userId: string;

    @ApiProperty({
        description: 'Content ID (Movie or TVShow)',
        example: '507f1f77bcf86cd799439012'
    })
    @IsNotEmpty()
    @IsMongoId()
    contentId: string;

    @ApiProperty({
        description: 'Type of content',
        enum: ContentType,
        example: ContentType.Movie
    })
    @IsNotEmpty()
    @IsEnum(ContentType)
    contentType: ContentType;

    @ApiPropertyOptional({
        description: 'Optional notes about this content',
        example: 'Must watch this weekend!'
    })
    @IsOptional()
    @IsString()
    notes?: string;

    @ApiPropertyOptional({
        description: 'Priority level (1-5, higher is more urgent)',
        minimum: 1,
        maximum: 5,
        example: 5
    })
    @IsOptional()
    @Min(1)
    @Max(5)
    priority?: number;
}
