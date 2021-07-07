import { Controller, Get } from '@nestjs/common';

@Controller('courses')
export class CoursesController {
  @Get('list') //passa aqui o endpoint necessário
  findAll(): string {
    return 'Listagem de cursos';
  }
  @Get('show')
  findOne(): string {
    return 'um curso';
  }
}
