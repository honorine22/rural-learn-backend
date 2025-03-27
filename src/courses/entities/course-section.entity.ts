import { ApiProperty } from "@nestjs/swagger";
import { Course } from "./course.entity";
import { CourseLesson } from "./course-lesson.entity";

export class CourseSection {
  @ApiProperty({ example: "cljf8c9s50000qw3j6qw4p8x1" })
  id: string;

  @ApiProperty({ example: "Getting Started with JavaScript" })
  title: string;

  @ApiProperty({ 
    example: "An introduction to the basics of JavaScript programming",
    required: false
  })
  description?: string;

  @ApiProperty({ example: 1 })
  order: number;

  @ApiProperty({ type: () => Course })
  course: Course;

  @ApiProperty({ example: "cljf8c9s50000qw3j6qw4p8x2" })
  courseId: string;

  @ApiProperty({ type: [CourseLesson], isArray: true })
  lessons?: CourseLesson[];

  @ApiProperty({ example: new Date() })
  createdAt: Date;

  @ApiProperty({ example: new Date() })
  updatedAt: Date;
}