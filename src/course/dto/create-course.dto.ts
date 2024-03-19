// src/recipes/dto/create-recipe.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  rating: string;

  @IsString()
  totalHours: string;
}