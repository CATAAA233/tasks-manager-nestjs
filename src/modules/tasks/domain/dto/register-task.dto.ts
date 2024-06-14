import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { TaskStatusEnum } from '../enums';

export class RegisterTaskDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(TaskStatusEnum, {
    message:
      'status must be one of the following values: to_do, in_progress, done',
  })
  status: string;

  @IsNotEmpty()
  @IsDateString(
    {},
    {
      message:
        'Deadline must be a valid ISO 8601 date string, Example: 2023-06-14T15:30:00Z',
    },
  )
  deadline: string;

  @IsOptional()
  @IsString()
  comments?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string;

  @IsOptional()
  @IsString()
  file?: string;
}
