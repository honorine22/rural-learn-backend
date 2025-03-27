import { ApiProperty } from "@nestjs/swagger";
import { CourseEnrollment } from "./course-enrollment.entity";

export class CourseProgress {
    @ApiProperty({ example: "cljf8c9s50000qw3j6qw4p8x1" })
    id: string;

    @ApiProperty({ type: () => CourseEnrollment })
    enrollment?: CourseEnrollment;

    @ApiProperty({ example: "cljf8c9s50000qw3j6qw4p8x2" })
    enrollmentId: string;

    @ApiProperty({
        example: ["cljf8c9s50000qw3j6qw4p8x3", "cljf8c9s50000qw3j6qw4p8x4"],
        isArray: true
    })
    completedLessons: string[];

    @ApiProperty({
        example: "cljf8c9s50000qw3j6qw4p8x5",
        required: false
    })
    currentLessonId?: string;

    @ApiProperty({ example: 45.5, default: 0 })
    progressPercentage: number;

    @ApiProperty({ example: 3600, default: 0, description: "Total time spent in seconds" })
    totalTimeSpent: number;

    @ApiProperty({ example: new Date() })
    createdAt: Date;

    @ApiProperty({ example: new Date() })
    updatedAt: Date;
}