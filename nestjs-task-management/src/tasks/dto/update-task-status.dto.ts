import { IsEnum } from 'class-validator';
import { taskStatus } from '../task.model';

//verifica ca statusul primit ca si paramentru este unul dintre membrii enum-ului taskStatus
export class UpdateTaskStatusDto {
  @IsEnum(taskStatus)
  status: taskStatus;
}
