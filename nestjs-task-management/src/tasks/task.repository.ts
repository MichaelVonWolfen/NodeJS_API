import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Users } from '../auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { createTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { taskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  private logger = new Logger('Tasks Repository', true);
  async getTasks(
    GetTaskFilterDto: GetTaskFilterDto,
    user: Users,
  ): Promise<Task[]> {
    const { status, search } = GetTaskFilterDto;
    const query = this.createQueryBuilder('task');
    query.where({ user });
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    let tasks;
    try {
      tasks = await query.getMany();
    } catch (error) {
      this.logger.error(
        `Get tasks from database failedfor user "${
          user.username
        }". Filters: ${JSON.stringify(GetTaskFilterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
    return tasks;
  }
  async createTask(createTaskDto: createTaskDto, user: Users): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: taskStatus.OPEN,
      user: user,
    });
    await this.save(task);
    return task;
  }
}
