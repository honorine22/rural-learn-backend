import { ApiProperty } from "@nestjs/swagger";

export class CourseSection {
    @ApiProperty({ example: "Getting Started with JavaScript" })
    title: string;

    @ApiProperty({
        example: "An introduction to the basics of JavaScript programming",
        required: false,
    })
    description?: string;

    @ApiProperty({ example: 1 })
    order: number;

    @ApiProperty({ example: "cljf8c9s50000qw3j6qw4p8x2" }) // courseId, passed from the route
    courseId: string;
}