import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsDate, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Genre } from '../../common/enums/genre.enum';

export class CreateMovieDto {
    @ApiProperty({
        description: 'Movie title',
        example: 'Inception',
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: 'Movie description',
        example: 'A thief who steals corporate secrets through dream-sharing technology...',
    })
    @IsString()
    description: string;

    @ApiProperty({
        description: 'Movie genres',
        enum: Genre,
        isArray: true,
        example: ['SciFi', 'Action'],
    })
    @IsArray()
    @IsEnum(Genre, { each: true })
    genres: Genre[];

    @ApiProperty({
        description: 'Release date',
        example: '2010-07-16',
        type: Date,
    })
    @IsDate()
    @Type(() => Date)
    releaseDate: Date;

    @ApiProperty({
        description: 'Director name',
        example: 'Christopher Nolan',
    })
    @IsString()
    director: string;

    @ApiProperty({
        description: 'List of actors',
        example: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt'],
        required: false,
    })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    actors?: string[];
}
