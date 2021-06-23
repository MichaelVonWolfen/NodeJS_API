import { EntityRepository, Repository } from 'typeorm';
import { createTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { taskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async getTasks(GetTaskFilterDto: GetTaskFilterDto): Promise<Task[]> {
    const { status, search } = GetTaskFilterDto;
    const query = this.createQueryBuilder('task');
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }
    const tasks = query.getMany();
    return tasks;
  }
  async createTask(createTaskDto: createTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: taskStatus.OPEN,
    });
    await this.save(task);
    return task;
  }
}
