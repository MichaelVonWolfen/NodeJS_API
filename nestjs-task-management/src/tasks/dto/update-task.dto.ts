import { taskStatus } from '../task-status.enum';

export class updateTaskDto {
  id: string;
  status: taskStatus;
}
