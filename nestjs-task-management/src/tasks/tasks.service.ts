import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { taskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksRepository } from './task.repository';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private taskRepository: TasksRepository,
  ) {}

  async getTaskbyID(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with ${id} not found.`);
    }
    return found;
  }
  async createTask(createTaskDto: createTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }
  async deleteTaskById(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
  async updateTaskById(id: string, status: taskStatus): Promise<Task> {
    const task = await this.getTaskbyID(id);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
  async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }

  // private tasks: Task[] = [];
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   //def temp arr to hold result
  //   let tasks = this.getAllTasks();
  //   //do smth with status
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === taskStatus[status]);
  //   }
  //   //do smth with search
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (
  //         task.title.toLowerCase().includes(search.toLowerCase()) ||
  //         task.description.toLowerCase().includes(search.toLowerCase())
  //       )
  //         return true;
  //       return false;
  //     });
  //   }
  //   //return final result
  //   return tasks;
  // }
  // getTaskById(id: string): Task {
  //   const task: Task = this.tasks.find((task) => task.id === id);
  //   if (task) {
  //     return task;
  //   } else {
  //     throw new NotFoundException(`Task with id: '${id}' NOT FOUND!`);
  //   }
  // }
  // createTask(createTaskDto: createTaskDto): Task {
  // const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: taskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // updateTaskById(id: string, status: taskStatus): Task {
  //   const updatable_Task = this.getTaskById(id);
  //   updatable_Task.status = taskStatus[status];
  //   this.tasks = this.tasks.filter((task) => task.id !== id);
  //   this.tasks.push(updatable_Task);
  //   return updatable_Task;
  // }
  // deleteTaskById(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== id);
  // }
}
