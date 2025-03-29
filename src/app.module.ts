import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { AuthModule } from "./auth/auth.module"
import { UsersModule } from "./users/users.module"
import { CoursesModule } from "./courses/courses.module"
import { AnalyticsModule } from "./analytics/analytics.module"
import { DashboardModule } from "./dashboard/dashboard.module"
import { NotificationsModule } from "./notifications/notifications.module"
import { AchievementsModule } from "./achievements/achievements.module"
import { CertificatesModule } from "./certificates/certificates.module"
import { AiModule } from "./ai/ai.module"
import { APP_GUARD, Reflector } from "@nestjs/core"
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard"
import { RolesGuard } from "./auth/guards/roles.guard"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    CoursesModule,
    AnalyticsModule,
    DashboardModule,
    NotificationsModule,
    AchievementsModule,
    CertificatesModule,
    AiModule,
  ],
  controllers: [AppController],
  providers: [AppService, Reflector],
})
export class AppModule { }
