import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { CreateReviewDto } from "./dto/create-review.dto"
import { UpdateProgressDto } from "./dto/update-progress.dto"
import { CreateCourseDto } from "./dto/create-course.dto"
import { UpdateCourseDto } from "./dto/update-course.dto"
import { PaginationDto } from "src/common/pagination.dto"
import { EnrollmentStatus, LessonType } from "./enums/course.enum"
import { CourseLesson } from "./entities/course-lesson.entity"
import { CourseSection } from "./entities/course-section.entity"

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createCourseDto: CreateCourseDto, user: any) {
    // Extract properties from DTO to ensure correct types
    const {
      title,
      description,
      thumbnail,
      price,
      duration,
      tags,
      level
    } = createCourseDto;

    // Convert enum to string if needed
    const status = createCourseDto.status as string;

    return this.prisma.course.create({
      data: {
        title,
        description,
        thumbnail,
        status,
        price: price ?? 0, // Default to 0 if price is undefined
        duration,
        tags,
        level: level as string,
        instructor: {
          connect: { id: user.id }
        }
      },
      include: {
        instructor: true
      }
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto
    const skip = (page - 1) * limit

    const courses = await Promise.all([
      this.prisma.course.findMany({
        skip,
        take: limit,
        include: {
          instructor: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      }),
      this.prisma.course.count()
    ])

    const total = await this.prisma.course.count();

    return {
      data: courses,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  }

  async findOne(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id: Number(id) },
      include: {
        instructor: true,
        sections: {
          include: {
            lessons: true
          },
          orderBy: {
            order: 'asc'
          }
        },
        reviews: {
          include: {
            user: true
          }
        }
      }
    })

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`)
    }

    return course
  }

  async update(id: string, updateCourseDto: UpdateCourseDto, user: any) {
    const course = await this.findOne(id)

    // Check if user is instructor of the course or admin
    if (course.instructorId !== user.id && !user.roles.includes("admin")) {
      throw new ForbiddenException("You are not authorized to update this course")
    }

    return this.prisma.course.update({
      where: { id: Number(id) },
      data: updateCourseDto,
      include: {
        instructor: true
      }
    })
  }

  async remove(id: string, user: any) {
    const course = await this.findOne(id)

    // Check if user is instructor of the course or admin
    if (course.instructorId !== user.id && !user.roles.includes("admin")) {
      throw new ForbiddenException("You are not authorized to delete this course")
    }

    await this.prisma.course.delete({
      where: { id: Number(id) }
    })
  }

  async enroll(courseId: string, user: any) {
    const course = await this.findOne(courseId)

    // Check if already enrolled
    const existingEnrollment = await this.prisma.courseEnrollment.findFirst({
      where: {
        courseId: Number(courseId),
        userId: user.id
      },
      include: {
        progress: true
      }
    })

    if (existingEnrollment) {
      return existingEnrollment
    }

    // Find first lesson if available
    const firstSection = await this.prisma.courseSection.findFirst({
      where: { courseId: Number(courseId) },
      orderBy: { order: 'asc' },
      include: {
        lessons: {
          orderBy: { order: 'asc' },
          take: 1
        }
      }
    })

    const firstLessonId = firstSection?.lessons[0]?.id || null

    // Create enrollment with progress
    return this.prisma.courseEnrollment.create({
      data: {
        courseId: Number(courseId),
        userId: user.id,
        status: EnrollmentStatus.ACTIVE,
        progress: {
          create: {
            completedLessons: [],
            currentLesson: firstLessonId ?? 0, // Changed from currentLessonId to currentLesson
            progressPercentage: 0,
            totalTimeSpent: 0
          }
        }
      },
      include: {
        course: {
          include: {
            instructor: true
          }
        },
        progress: true
      }
    })
  }

  async getEnrolledCourses(user: any, paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto
    const skip = (page - 1) * limit

    const [enrollments, total] = await Promise.all([
      this.prisma.courseEnrollment.findMany({
        where: {
          userId: user.id
        },
        include: {
          course: {
            include: {
              instructor: true
            }
          },
          progress: true
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      this.prisma.courseEnrollment.count({
        where: {
          userId: user.id
        }
      })
    ])

    return {
      data: enrollments,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  }

  async addReview(courseId: string, createReviewDto: CreateReviewDto, user: any) {
    // Check if course exists
    await this.findOne(courseId)

    // Check if user is enrolled in the course
    const enrollment = await this.prisma.courseEnrollment.findFirst({
      where: {
        courseId: Number(courseId),
        userId: user.id
      }
    })

    if (!enrollment) {
      throw new ForbiddenException("You must be enrolled in the course to leave a review")
    }

    // Check if user already reviewed the course
    const existingReview = await this.prisma.courseReview.findFirst({
      where: {
        courseId: Number(courseId),
        userId: user.id
      }
    })

    if (existingReview) {
      // Update existing review
      return this.prisma.courseReview.update({
        where: { id: existingReview.id },
        data: {
          ...createReviewDto,
          courseId: undefined, // Exclude courseId to match Prisma's expected type
        },
        include: {
          user: true,
          course: true
        }
      })
    }

    // Create new review
    const review = await this.prisma.courseReview.create({
      data: {
        ...createReviewDto,
        courseId: Number(courseId),
        userId: user.id
      },
      include: {
        user: true,
        course: true
      }
    })

    // Update course average rating and review count
    const courseReviews = await this.prisma.courseReview.findMany({
      where: { courseId: Number(courseId) }
    })

    const averageRating = courseReviews.reduce((acc, review) => acc + review.rating, 0) / courseReviews.length

    await this.prisma.course.update({
      where: { id: Number(courseId) },
      data: {
        averageRating,
        reviewCount: courseReviews.length
      }
    })

    return review
  }

  async updateProgress(courseId: string, updateProgressDto: UpdateProgressDto, user: any) {
    // Find enrollment with progress
    const enrollment = await this.prisma.courseEnrollment.findFirst({
      where: {
        courseId: Number(courseId),
        userId: user.id
      },
      include: {
        progress: true
      }
    })

    if (!enrollment || !enrollment.progress) {
      throw new NotFoundException("Enrollment or progress not found")
    }

    // Get total lessons count
    const totalLessons = await this.prisma.courseLesson.count({
      where: {
        section: {
          courseId: Number(courseId)
        }
      }
    })

    // Update progress
    const progress = enrollment.progress
    let completedLessons = progress.completedLessons || []

    if (updateProgressDto.completedLessonId && !completedLessons.includes(Number(updateProgressDto.completedLessonId))) {
      completedLessons = [...completedLessons, Number(updateProgressDto.completedLessonId)]
    }

    // Calculate progress percentage
    const progressPercentage = totalLessons > 0
      ? (completedLessons.length / totalLessons) * 100
      : 0

    // Check if course is completed
    if (progressPercentage >= 100) {
      // Update enrollment status
      await this.prisma.courseEnrollment.update({
        where: { id: enrollment.id },
        data: {
          status: EnrollmentStatus.COMPLETED,
          completedAt: new Date()
        }
      })

      // Update course completion count
      await this.prisma.course.update({
        where: { id: Number(courseId) },
        data: {
          completionCount: {
            increment: 1
          }
        }
      })
    }

    // Update progress
    await this.prisma.courseProgress.update({
      where: { id: progress.id },
      data: {
        completedLessons,
        currentLesson: updateProgressDto.currentLessonId ? Number(updateProgressDto.currentLessonId) : progress.currentLesson, // Ensure currentLessonId is a number
        progressPercentage
      }
    })

    // Return updated enrollment with progress
    return this.prisma.courseEnrollment.findFirst({
      where: { id: enrollment.id },
      include: { progress: true }
    })
  }

  async addSection(courseId: string, createSectionDto: CourseSection) {
    // Ensure the course exists before creating the section
    const course = await this.prisma.course.findUnique({
      where: { id: Number(courseId) },
    });
  
    if (!course) {
      throw new NotFoundException("Course not found");
    }
  
    // Create the section and link it to the course
    return this.prisma.courseSection.create({
      data: {
        ...createSectionDto, // This includes title, description, order, courseId
        courseId: Number(courseId), // Ensure courseId is an integer
        lessons: { connect: [] }, // Empty or predefined lessons (to be handled separately)
      },
    });
  }
  

  async addLesson(sectionId: string, createLessonDto: CourseLesson) {
    const section = await this.prisma.courseSection.findUnique({
      where: { id: Number(sectionId) },
    });
  
    if (!section) {
      throw new NotFoundException("Section not found");
    }
  
    return this.prisma.courseLesson.create({
      data: {
        ...createLessonDto,
        sectionId: Number(sectionId),
        id: Number(createLessonDto.id), // Ensure id is a number
      },
    });
  }
  
  // ✅ Get all sections in a course
  async getSections(courseId: string) {
    const course = await this.prisma.course.findUnique({
      where: { id: Number(courseId) },
      include: { sections: true },
    });

    if (!course) {
      throw new NotFoundException("Course not found");
    }

    return course.sections;
  }

  // ✅ Get all lessons in a section
  async getLessons(sectionId: string) {
    const section = await this.prisma.courseSection.findUnique({
      where: { id: Number(sectionId) },
      include: { lessons: true },
    });

    if (!section) {
      throw new NotFoundException("Section not found");
    }

    return section.lessons;
  }
}