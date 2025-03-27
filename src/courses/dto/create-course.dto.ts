import { IsNotEmpty, IsString, IsNumber, IsOptional, IsArray, IsEnum, Min, Max } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { CourseLevel, CourseStatus } from "../enums/course.enum"
export class CreateCourseDto {
    @ApiProperty({
        example: "Introduction to JavaScript",
        description: "The title of the course"
    })
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty({
        example: "Learn the basics of JavaScript programming",
        description: "Detailed description of the course content"
    })
    @IsString()
    @IsNotEmpty()
    description: string

    @ApiProperty({
        example: "https://example.com/thumbnail.jpg",
        required: false,
        description: "URL to the course thumbnail image"
    })
    @IsString()
    @IsOptional()
    thumbnail?: string

    @ApiProperty({
        enum: CourseStatus,
        enumName: 'CourseStatus',
        example: CourseStatus.PUBLISHED,
        default: CourseStatus.DRAFT,
        description: "Current status of the course"
    })
    @IsEnum(CourseStatus)
    @IsOptional()
    status?: CourseStatus

    @ApiProperty({
        example: 29.99,
        default: 0,
        description: "Price of the course in USD",
        minimum: 0
    })
    @IsNumber()
    @Min(0)
    @IsOptional()
    price?: number

    @ApiProperty({
        example: "10 hours",
        required: false,
        description: "Estimated time to complete the course"
    })
    @IsString()
    @IsOptional()
    duration?: string

    @ApiProperty({
        example: ["javascript", "web development"],
        required: false,
        isArray: true,
        description: "List of tags associated with the course"
    })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    tags?: string[]

    @ApiProperty({
        enum: CourseLevel,
        enumName: 'CourseLevel',
        example: CourseLevel.BEGINNER,
        default: CourseLevel.BEGINNER,
        description: "Difficulty level of the course"
    })
    @IsEnum(CourseLevel)
    @IsOptional()
    level?: CourseLevel
}