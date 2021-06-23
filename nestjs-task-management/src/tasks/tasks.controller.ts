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
import { createTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getTasks(@Query() filterDto: GetTaskFilterDto): Promise<Task[]> {
    //if filters then call taskservice.gettaskeitfilters
    return this.tasksService.getTasks(filterDto);
    // if (Object.keys(filterDto).length) {
    //   return this.tasksService.getTasksWithFilters(filterDto);
    // } else {
    //   //else get all tasks
    //   return this.tasksService.getAllTasks();
    // }
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskbyID(id);
  }

  @Post()
  createTask(@Body() createTask: createTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTask);
  }

  @Patch('/:id/status')
  async updateTaskStatusByID(
    @Param('id') id: string,
    @Body() UpdateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    return this.tasksService.updateTaskById(id, UpdateTaskStatusDto.status);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTaskById(id);
  }
}
