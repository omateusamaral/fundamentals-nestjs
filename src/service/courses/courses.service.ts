import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from 'src/controller/courses/dto/create-course.dto';
import { UpdateCourseDto } from 'src/controller/courses/dto/update-course.dto';
import { Course } from 'src/Model/course.entity';
import { Tag } from 'src/Model/tag.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,

    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  findAll() {
    return this.courseRepository.find({
      relations: ['tags'],
    });
  }

  findOne(courseId: string) {
    const course = this.courseRepository.findOne({
      where: {
        id: courseId,
      },
      relations: ['tags'],
    });

    if (!course) {
      throw new NotFoundException(`Course #${courseId} not founded`);
    }
    return course;
  }
  async create(createCourseDto: CreateCourseDto) {
    try {
      const tags = await Promise.all(
        createCourseDto.tags.map((name) => this.preloadTagByName(name)),
      );

      const createdCourse = this.courseRepository.create({
        ...createCourseDto,
        tags,
      });
      return this.courseRepository.save(createdCourse);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async update(courseId: string, updateCourseDto: UpdateCourseDto) {
    const tags =
      updateCourseDto.tags &&
      (await Promise.all(
        updateCourseDto.tags.map((name) => this.preloadTagByName(name)),
      ));

    const course = await this.courseRepository.preload({
      id: courseId,
      ...updateCourseDto,
      tags,
    });

    if (!course) {
      throw new NotFoundException(`Course ID  ${courseId} not found`);
    }
    return this.courseRepository.save(course);
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

    await this.courseRepository.remove(course);
  }

  private async preloadTagByName(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ name });

    if (tag) {
      return tag;
    }

    return this.tagRepository.create({ name });
  }
}
