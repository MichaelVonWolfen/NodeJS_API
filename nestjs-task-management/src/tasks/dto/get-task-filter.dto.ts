import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { taskStatus } from '../task.model';

export class GetTaskFilterDto {
  @IsOptional()
  @IsEnum(taskStatus)
  status?: taskStatus;

  @IsOptional()
  @IsNotEmpty()
  search?: string;
}
