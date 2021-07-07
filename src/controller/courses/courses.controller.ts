import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';

@Controller('courses') //aqui a rota
export class CoursesController {
  @Get('list') //passa aqui o endpoint necessário
  findAll(@Res() response): string {
    return response.status(200).send('listagem do curso');
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

  //metodo http status code
  @Post('create/status')
  //httpsStatus tem todos status code
  @HttpCode(HttpStatus.NO_CONTENT)
  createStatus(@Body() body) {
    return body;
  }
}
