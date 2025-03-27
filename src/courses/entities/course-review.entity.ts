import { ApiProperty } from "@nestjs/swagger";
import { Course } from "./course.entity";
import { UserDto } from "src/users/entity/user.entity";

export class CourseReview {
    @ApiProperty({ example: "cljf8c9s50000qw3j6qw4p8x1" })
    id: string;

    @ApiProperty({ example: 4.5, minimum: 1, maximum: 5 })
    rating: number;

    @ApiProperty({ example: "This course was excellent and very informative!" })
    comment: string;

    @ApiProperty({ type: () => UserDto })
    user: UserDto;

    @ApiProperty({ example: "cljf8c9s50000qw3j6qw4p8x2" })
    userId: string;

    @ApiProperty({ type: () => Course })
    course: Course;

    @ApiProperty({ example: "cljf8c9s50000qw3j6qw4p8x3" })
    courseId: string;

    @ApiProperty({ example: new Date() })
    createdAt: Date;

    @ApiProperty({ example: new Date() })
    updatedAt: Date;
}