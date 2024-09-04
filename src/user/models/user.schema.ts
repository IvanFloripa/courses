// src/recipes/dto/create-recipe.dto.ts
import { IsString } from 'class-validator';

export class UserSchema {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
