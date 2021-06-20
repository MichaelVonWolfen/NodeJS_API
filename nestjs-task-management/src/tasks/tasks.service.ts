import { Injectable } from '@nestjs/common';
import { Task, taskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { createTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
    const { status, search } = filterDto;

    //def temp arr to hold result
    let tasks = this.getAllTasks();
    //do smth with status
    if (status) {
      tasks = tasks.filter((task) => task.status === taskStatus[status]);
    }
    //do smth with search
    if (search) {
      tasks = tasks.filter((task) => {
        if (
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase())
        )
          return true;
        return false;
      });
    }
    //return final result
    return tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDto: createTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: taskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
  updateTaskById(id: string, status: taskStatus): Task {
    if (!Object.values(taskStatus).includes(status)) {
      return;
    }
    const updatable_Task = this.getTaskById(id);
    updatable_Task.status = taskStatus[status];
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.tasks.push(updatable_Task);
    return updatable_Task;
  }
  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
