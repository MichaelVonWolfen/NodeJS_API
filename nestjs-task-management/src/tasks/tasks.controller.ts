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
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
  //   //if filters then call taskservice.gettaskeitfilters
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTasksWithFilters(filterDto);
  //   } else {
  //     //else get all tasks
  //     return this.tasksService.getAllTasks();
  //   }
  // }

  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task {
  //   return this.tasksService.getTaskById(id);
  // }

  // @Post()
  // createTask(@Body() createTask: createTaskDto): Task {
  //   return this.tasksService.createTask(createTask);
  // }

  // @Patch('/:id/status')
  // updateTaskStatusByID(
  //   @Param('id') id: string,
  //   @Body() UpdateTaskStatusDto: UpdateTaskStatusDto,
  // ): Task {
  //   return this.tasksService.updateTaskById(id, UpdateTaskStatusDto.status);
  // }

  // @Delete('/:id')
  // deleteTask(@Param('id') id: string) {
  //   this.tasksService.deleteTaskById(id);
  // }
}
