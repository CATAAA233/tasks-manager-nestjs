import { IsNotEmpty, IsOptional, IsString, IsArray } from 'class-validator';

export class RegisterTaskDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  deadline: string;

  @IsNotEmpty()
  @IsString()
  created_by: string;

  @IsOptional()
  @IsString()
  comments?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  file?: string;
}
