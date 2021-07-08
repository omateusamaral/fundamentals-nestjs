import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCourseDto } from 'src/controller/courses/dto/create-course.dto';
import { UpdateCourseDto } from 'src/controller/courses/dto/update-course.dto';
import { Course } from 'src/Model/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  findAll() {
    return this.courseRepository.find();
  }

  findOne(courseId: string) {
    const course = this.courseRepository.findOne({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      throw new NotFoundException(`Course #${courseId} not founded`);
    }
    return course;
  }
  create(createCourseDto: CreateCourseDto) {
    try {
      const createdCourse = this.courseRepository.create(createCourseDto);
      return this.courseRepository.save(createdCourse);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async update(courseId: string, updateCourseDto: UpdateCourseDto) {
    await this.courseRepository
      .createQueryBuilder()
      .update()
      .set({
        ...updateCourseDto,
      })
      .where('id=:courseId', {
        courseId,
      })
      .execute();
  }

  async delete(courseId: string) {
    const course = await this.courseRepository.findOne({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      throw new NotFoundException('Course not founded in our database');
    }

    return this.courseRepository.remove(course);
  }
}
