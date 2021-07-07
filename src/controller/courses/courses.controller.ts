import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('courses') //aqui a rota
export class CoursesController {
  @Get('list') //passa aqui o endpoint necessário
  findAll(): string {
    return 'Listagem de cursos';
  }

  //parametros de rota
  @Get('show/:courseId')
  findOne(@Param('courseId') courseId: string) {
    return `um curso número #${courseId}`;
  }

  //metodo de criação
  @Post('create')
  // pegar uma informação especifica
  // create(@Body('name') body) {
  create(@Body() body) {
    return body;
  }
}
