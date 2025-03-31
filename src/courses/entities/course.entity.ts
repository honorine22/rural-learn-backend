import { ApiProperty } from "@nestjs/swagger";
import { CourseEnrollment } from "./course-enrollment.entity";
import { CourseReview } from "./course-review.entity";
import { CourseLevel, CourseStatus } from "../enums/course.enum";
import { UserDto } from "src/users/entity/user.entity";
import { CreateCourseSectionDto } from "./course-section.entity";

export class Course {
  @ApiProperty({ example: "cljf8c9s50000qw3j6qw4p8x1" })
  id: string;

  @ApiProperty({ example: "Complete JavaScript Course 2023" })
  title: string;

  @ApiProperty({ 
    example: "A comprehensive guide to JavaScript from beginner to advanced" 
  })
  description: string;

  @ApiProperty({ 
    example: "https://example.com/thumbnails/js-course.jpg",
    required: false
  })
  thumbnail?: string;

  @ApiProperty({ 
    enum: CourseStatus,
    enumName: 'CourseStatus',
    example: CourseStatus.PUBLISHED,
    default: CourseStatus.DRAFT
  })
  status: CourseStatus;

  @ApiProperty({ example: 29.99, default: 0 })
  price: number;

  @ApiProperty({ example: "20 hours", required: false })
  duration?: string;

  @ApiProperty({ 
    example: ["javascript", "web development"],
    isArray: true,
    required: false
  })
  tags?: string[];

  @ApiProperty({ 
    enum: CourseLevel,
    enumName: 'CourseLevel',
    example: CourseLevel.BEGINNER,
    default: CourseLevel.BEGINNER
  })
  level: CourseLevel;

  @ApiProperty({ example: 1250, default: 0 })
  enrollmentCount: number;

  @ApiProperty({ example: 875, default: 0 })
  completionCount: number;

  @ApiProperty({ example: 4.7, default: 0 })
  averageRating: number;

  @ApiProperty({ example: 320, default: 0 })
  reviewCount: number;

  @ApiProperty({ type: () => UserDto })
  instructor: UserDto;

  @ApiProperty({ example: "cljf8c9s50000qw3j6qw4p8x2" })
  instructorId: string;

  @ApiProperty({ type: [CreateCourseSectionDto], isArray: true })
  sections?: CreateCourseSectionDto[];

  @ApiProperty({ type: [CourseEnrollment], isArray: true })
  enrollments?: CourseEnrollment[];

  @ApiProperty({ type: [CourseReview], isArray: true })
  reviews?: CourseReview[];

  @ApiProperty({ example: new Date() })
  createdAt: Date;

  @ApiProperty({ example: new Date() })
  updatedAt: Date;
}