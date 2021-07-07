import { Module } from '@nestjs/common';
import { CoursesController } from '../../controller/courses/courses.controller';
import { CoursesService } from '../../service/courses/courses.service';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
