import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { AppModule } from "./app.module"
import helmet from "helmet"
import * as compression from "compression"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  )

  // Security
  app.use(helmet())

  // Compression
  app.use(compression())

  // CORS
  app.enableCors()

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle("RuraLearn API")
    .setDescription("The RuraLearn API documentation")
    .setVersion("1.0")
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)

  const port = process.env.PORT || 3000
  await app.listen(port)
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()

