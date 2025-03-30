import { ApiProperty } from "@nestjs/swagger";
import { LessonType } from "../enums/course.enum";

export class CourseLesson {
    @ApiProperty({ example: "cljf8c9s50000qw3j6qw4p8x1" })
    id: string;

    @ApiProperty({ example: "Getting Started with JavaScript" })
    title: string;

    @ApiProperty({
        example: "An introduction to the basics of JavaScript programming",
        required: false,
    })
    description?: string;

    @ApiProperty({ example: 1 })
    order: number;

    @ApiProperty({
        enum: LessonType,
        enumName: 'LessonType',
        example: LessonType.VIDEO, // Example default value
        required: true,
      })
      type: LessonType; // Ensure this is included when creating a lesson
    
    @ApiProperty({ example: "cljf8c9s50000qw3j6qw4p8x2" }) // courseId
    courseId: string;

    @ApiProperty({ example: new Date() })
    createdAt: Date;

    @ApiProperty({ example: new Date() })
    updatedAt: Date;
}