import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CoursesService } from 'src/service/courses/courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses') //aqui a rota
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  @Get('list') //passa aqui o endpoint necessário
  findAll() {
    return this.coursesService.findAll();
  }

  //parametros de rota
  @Get('show/:courseId')
  findOne(@Param('courseId') courseId: string) {
    return this.coursesService.findOne(courseId);
  }

  //metodo de criação
  @Post('create')
  create(@Body() body: CreateCourseDto) {
    return this.coursesService.create(body);
  }

  //requisições patch, put e delete
  @Patch(':courseId')
  update(@Param('courseId') courseId: string, @Body() body: UpdateCourseDto) {
    return this.coursesService.update(courseId, body);
  }

  @Delete(':courseId')
  remove(@Param('courseId') courseId: string) {
    return this.coursesService.delete(courseId);
  }
}
