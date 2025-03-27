import { IsOptional, IsNumber, IsUUID, Min, Max } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class UpdateProgressDto {
    @ApiProperty({
        example: "123e4567-e89b-12d3-a456-426614174000",
        required: false,
        description: "ID of the completed lesson"
    })
    @IsUUID()
    @IsOptional()
    completedLessonId?: string

    @ApiProperty({
        example: "123e4567-e89b-12d3-a456-426614174000",
        required: false,
        description: "ID of the current lesson"
    })
    @IsUUID()
    @IsOptional()
    currentLessonId?: string

    @ApiProperty({
        example: 75,
        required: false,
        description: "Overall progress percentage",
        minimum: 0,
        maximum: 100
    })
    @IsNumber()
    @Min(0)
    @Max(100)
    @IsOptional()
    progressPercentage?: number
}
