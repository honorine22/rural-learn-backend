import { Module } from "@nestjs/common"
import { CoursesService } from "./courses.service"
import { CoursesController } from "./courses.controller"
import { UsersModule } from "../users/users.module"
import { PrismaService } from "src/prisma/prisma.service"

@Module({
  imports: [
    UsersModule,
  ],
  controllers: [CoursesController],
  providers: [CoursesService, PrismaService],
  exports: [CoursesService],
})
export class CoursesModule { }