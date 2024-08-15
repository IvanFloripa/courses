import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
// import { ApiParam } from '@nestjs/swagger';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  async findAll() {
    return await this.courseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.courseService.findOne(+id);
  }

  @Get('searchDescription/:inputDescription')
  async findDescription(@Param('inputDescription') inputDescription?: string) {
    return await this.courseService.findDescription(inputDescription);
  }

  @Get('searchTitle/:inputTitle')
  async findTitle(@Param('inputTitle') inputTitle?: string) {
    console.log(inputTitle);
    return await this.courseService.findTitle(inputTitle);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Get(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
