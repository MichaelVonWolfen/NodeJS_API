import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { taskStatus } from '../task-status.enum';

export class GetTaskFilterDto {
  @IsOptional()
  @IsEnum(taskStatus)
  status?: taskStatus;

  @IsOptional()
  @IsNotEmpty()
  search?: string;
}
