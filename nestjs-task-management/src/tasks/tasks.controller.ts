import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import console from 'console';
import { createTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { updateTaskDto } from './dto/update-task.dto';
import { Task, taskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
    //if filters then call taskservice.gettaskeitfilters
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      //else get all tasks
      return this.tasksService.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: createTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateTaskStatusByID(
    @Param('id') id: string,
    @Body('status') status: taskStatus,
  ): Task {
    return this.tasksService.updateTaskById(id, status);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    this.tasksService.deleteTaskById(id);
  }
}
