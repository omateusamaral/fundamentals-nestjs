import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Course } from 'src/Model/course.entity';

@Injectable()
export class CoursesService {
  //por enquanto usaremos dados em memoria dps usaremos o bd
  private courses: Course[] = [
    {
      id: 1,
      name: 'Fundamentals NestJS',
      description: 'Fundamentals NestJS',
      tags: ['nodejs', 'nestjs', 'javascript'],
    },
  ];

  //simulando buscas/criacao/edicao/deletar no bd

  findAll() {
    return this.courses;
  }

  findOne(courseId: string) {
    const course = this.courses.find(
      (course) => course.id === Number(courseId),
    );

    if (!course) {
      throw new HttpException(
        `Course #${courseId} not founded`,
        HttpStatus.NOT_FOUND,
      );
    }
    return course;
  }
  create(createCourseDto: any) {
    try {
      this.courses.push(createCourseDto);
      return createCourseDto;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  update(courseId, updateCourseDto: any) {
    const indexCourse = this.courses.findIndex(
      (course) => course.id === Number(courseId),
    );

    if (indexCourse === -1) {
      throw new HttpException(
        `Couse ${courseId} not founded in our database`,
        HttpStatus.NOT_FOUND,
      );
    }
    this.courses[indexCourse] = updateCourseDto;
  }

  delete(courseId: string) {
    const indexCourse = this.courses.findIndex(
      (course) => course.id === Number(courseId),
    );
    //indexCourse pode retornar -1 caso não encontrar nada
    if (indexCourse === -1) {
      throw new HttpException(
        `Couse ${courseId} not founded in our database`,
        HttpStatus.NOT_FOUND,
      );
    }
    this.courses.splice(indexCourse, 1);
  }
}
