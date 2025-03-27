import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

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