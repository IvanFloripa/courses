import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCourseDto: CreateCourseDto) {
    return this.prisma.course.create({
      data: createCourseDto,
    });
  }

  findAll() {
    return this.prisma.course.findMany();
  }

  findOne(id: number) {
    return this.prisma.course.findUnique({
      where: { id },
    });
  }

  findTitle(inputTitle: string) {
    return this.prisma.course.findMany({
      where: {
        title: {
          contains: inputTitle,
          mode: 'insensitive',
        },
      },
    });
  }
  findDescription(inputDescription?: string) {
    return this.prisma.course.findMany({
      where: {
        description: {
          contains: inputDescription,
          mode: 'insensitive',
        },
      },
    });
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.course.delete({
      where: { id },
    });
  }
}
