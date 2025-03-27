import { IsNotEmpty, IsString, IsNumber, Min, Max, IsUUID } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateReviewDto {
    @ApiProperty({
        example: 4.5,
        minimum: 1,
        maximum: 5,
        description: "Rating from 1 to 5 stars"
    })
    @IsNumber()
    @Min(1)
    @Max(5)
    @IsNotEmpty()
    rating: number

    @ApiProperty({
        example: "Great course, learned a lot!",
        description: "Detailed review comment"
    })
    @IsString()
    @IsNotEmpty()
    comment: string

    @ApiProperty({
        example: "123e4567-e89b-12d3-a456-426614174000",
        description: "ID of the course being reviewed",
        required: true
    })
    @IsUUID()
    @IsNotEmpty()
    courseId: string
}

// Enroll Course DTO
export class EnrollCourseDto {
    @ApiProperty({
        example: "123e4567-e89b-12d3-a456-426614174000",
        description: "ID of the course to enroll in",
        required: true
    })
    @IsUUID()
    @IsNotEmpty()
    courseId: string
}