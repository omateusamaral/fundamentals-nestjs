import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/Model/course.entity';
import { CoursesController } from '../../controller/courses/courses.controller';
import { CoursesService } from '../../service/courses/courses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
