import { ApiProperty } from "@nestjs/swagger";
import { LessonType } from "../enums/course.enum";
import { CourseSection } from "./course-section.entity";

export class CourseLesson {
    @ApiProperty({ example: "cljf8c9s50000qw3j6qw4p8x1" })
    id: string;

    @ApiProperty({ example: "Introduction to Variables" })
    title: string;

    @ApiProperty({
        example: "Learn about variables and how they store data in memory",
        required: false
    })
    description?: string;

    @ApiProperty({ example: 1 })
    order: number;

    @ApiProperty({
        enum: LessonType,
        enumName: 'LessonType',
        example: LessonType.VIDEO,
        default: LessonType.VIDEO
    })
    type: LessonType;

    @ApiProperty({
        example: "In this lesson, we'll cover the basics of variables...",
        required: false
    })
    content?: string;

    @ApiProperty({
        example: "https://example.com/videos/lesson1.mp4",
        required: false
    })
    videoUrl?: string;

    @ApiProperty({ example: "15 minutes", required: false })
    duration?: string;

    @ApiProperty({ example: false, default: false })
    isPreview: boolean;

    @ApiProperty({ type: () => CourseSection })
    section: CourseSection;

    @ApiProperty({ example: "cljf8c9s50000qw3j6qw4p8x2" })
    sectionId: string;

    @ApiProperty({ example: new Date() })
    createdAt: Date;

    @ApiProperty({ example: new Date() })
    updatedAt: Date;
}