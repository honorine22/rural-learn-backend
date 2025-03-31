import { ApiProperty } from "@nestjs/swagger";

export class CreateCourseSectionDto {
    @ApiProperty({ example: "Getting Started with JavaScript" })
    title: string;

    @ApiProperty({
        example: "An introduction to the basics of JavaScript programming",
        required: false,
    })
    description?: string;

    @ApiProperty({ example: 1 })
    order: number;
}