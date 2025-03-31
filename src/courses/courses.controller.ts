import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger"
import { CoursesService } from "./courses.service"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { RolesGuard } from "../auth/guards/roles.guard"
import { Roles } from "../auth/decorators/roles.decorator"
import { CreateReviewDto } from "./dto/create-review.dto"
import { UpdateProgressDto } from "./dto/update-progress.dto"
import { Request } from "express"
import { CreateCourseDto } from "./dto/create-course.dto"
import { PaginationDto } from "src/common/pagination.dto"
import { UpdateCourseDto } from "./dto/update-course.dto"
import { CreateCourseSectionDto } from "./entities/course-section.entity"
import { CourseLesson } from "./entities/course-lesson.entity"

@ApiTags("courses")
@Controller("courses")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "instructor")
  @ApiOperation({ summary: "Create a new course (Admin or Instructor)" })
  @ApiResponse({ status: 201, description: "Course successfully created" })
  create(@Body() createCourseDto: CreateCourseDto, @Req() req: Request) {
    return this.coursesService.create(createCourseDto, req.user)
  }

  @Get()
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({ status: 200, description: 'Return all courses' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.coursesService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a course by id' })
  @ApiResponse({ status: 200, description: 'Return the course' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Patch(":id")
  @Roles("admin", "instructor")
  @ApiOperation({ summary: "Update a course (Admin or Instructor)" })
  @ApiResponse({ status: 200, description: "Course successfully updated" })
  @ApiResponse({ status: 404, description: "Course not found" })
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto, @Req() req: Request) {
    return this.coursesService.update(id, updateCourseDto, req.user)
  }

  @Delete(":id")
  @Roles("admin", "instructor")
  @ApiOperation({ summary: "Delete a course (Admin or Instructor)" })
  @ApiResponse({ status: 200, description: "Course successfully deleted" })
  @ApiResponse({ status: 404, description: "Course not found" })
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.coursesService.remove(id, req.user)
  }

  @Post(":id/enroll")
  @ApiOperation({ summary: "Enroll in a course" })
  @ApiResponse({ status: 201, description: "Successfully enrolled in course" })
  @ApiResponse({ status: 404, description: "Course not found" })
  enroll(@Param('id') id: string, @Req() req: Request) {
    return this.coursesService.enroll(id, req.user)
  }

  @Get("user/enrolled")
  @ApiOperation({ summary: "Get all enrolled courses for current user" })
  @ApiResponse({ status: 200, description: "Return all enrolled courses" })
  getEnrolledCourses(@Req() req: Request, @Query() paginationDto: PaginationDto) {
    return this.coursesService.getEnrolledCourses(req.user, paginationDto)
  }

  @Post(":id/review")
  @ApiOperation({ summary: "Add a review to a course" })
  @ApiResponse({ status: 201, description: "Review successfully added" })
  @ApiResponse({ status: 404, description: "Course not found" })
  addReview(@Param('id') id: string, @Body() createReviewDto: CreateReviewDto, @Req() req: Request) {
    return this.coursesService.addReview(id, createReviewDto, req.user)
  }

  @Post(":id/progress")
  @ApiOperation({ summary: "Update course progress" })
  @ApiResponse({ status: 200, description: "Progress successfully updated" })
  @ApiResponse({ status: 404, description: "Course not found" })
  updateProgress(@Param('id') id: string, @Body() updateProgressDto: UpdateProgressDto, @Req() req: Request) {
    return this.coursesService.updateProgress(id, updateProgressDto, req.user)
  }

  @Post(":id/sections")
  @ApiOperation({ summary: "Add a new section to a course" })
  @ApiResponse({ status: 201, description: "Section created successfully" })
  @ApiResponse({ status: 404, description: "Course not found" })
  async addSection(@Param("id") id: string, @Body() createSectionDto: CreateCourseSectionDto) {
    return this.coursesService.addSection(id, createSectionDto);
  }

  // ✅ 2. Add a new lesson to a section
  @Post("sections/:id/lessons")
  @ApiOperation({ summary: "Add a new lesson to a section" })
  @ApiResponse({ status: 201, description: "Lesson created successfully" })
  @ApiResponse({ status: 404, description: "Section not found" })
  async addLesson(@Param("id") sectionId: string, @Body() createLessonDto: CourseLesson) {
    return this.coursesService.addLesson(sectionId, createLessonDto);
  }

  @Get(':id/sections')
  @ApiOperation({ summary: 'Get all sections for a course' })
  @ApiResponse({ status: 200, description: 'Return all sections' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  getSections(@Param('id') id: string) {
    return this.coursesService.getSections(id);
  }

  @Get(':id/lessons')
  @ApiOperation({ summary: 'Get all lessons for a course' })
  @ApiResponse({ status: 200, description: 'Return all lessons' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  getLessons(@Param('id') id: string) {
    return this.coursesService.getLessons(id);
  }
}