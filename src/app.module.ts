import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [PrismaModule, CourseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
