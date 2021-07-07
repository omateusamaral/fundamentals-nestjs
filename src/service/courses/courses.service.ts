import { Injectable } from '@nestjs/common';
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
    return this.courses.find((course) => course.id === Number(courseId));
  }
  create(createCourseDto: Course) {
    this.courses.push(createCourseDto);
  }
  update(courseId, updateCourseDto: Course) {
    const indexCourse = this.courses.findIndex(
      (course) => course.id === Number(courseId),
    );

    this.courses[indexCourse] = updateCourseDto;
  }

  delete(courseId: string) {
    const indexCourse = this.courses.findIndex(
      (course) => course.id === Number(courseId),
    );
    //indexCourse pode retornar -1 caso não encontrar nada
    if (indexCourse >= 0) {
      this.courses.splice(indexCourse, 1);
    }
  }
}
