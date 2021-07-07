import { IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly description: string;
  @IsString({ each: true }) //array só pode conter string
  readonly tags: string[];
}
