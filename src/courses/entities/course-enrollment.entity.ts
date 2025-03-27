import { ApiProperty } from "@nestjs/swagger";
import { EnrollmentStatus } from "../enums/course.enum";
import { UserDto } from "src/users/entity/user.entity";
import { Course } from "./course.entity";
import { CourseProgress } from "./course-progress.entity";

export class CourseEnrollment {
    @ApiProperty({ example: "cljf8c9s50000qw3j6qw4p8x1" })
    id: string;

    @ApiProperty({ type: () => UserDto })
    user: UserDto;

    @ApiProperty({ type: () => Course })
    course: Course;

    @ApiProperty({
        enum: EnrollmentStatus,
        enumName: 'EnrollmentStatus',
        example: EnrollmentStatus.ACTIVE,
        default: EnrollmentStatus.ACTIVE
    })
    status: EnrollmentStatus;

    @ApiProperty({ required: false, example: new Date() })
    completedAt?: Date;

    @ApiProperty({ type: () => CourseProgress })
    progress?: CourseProgress;

    @ApiProperty({ example: new Date() })
    createdAt: Date;

    @ApiProperty({ example: new Date() })
    updatedAt: Date;
}