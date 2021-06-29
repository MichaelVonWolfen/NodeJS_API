import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { getUser } from 'src/auth/get-user.decorator';
import { Users } from 'src/auth/user.entity';
import { createTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('Tasks Controller');
  constructor(private tasksService: TasksService) {}

  @Get()
  async getTasks(
    @Query() filterDto: GetTaskFilterDto,
    @getUser() USER: Users,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User "${USER.username}" retrieving tasks. Filters ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.tasksService.getTasks(filterDto, USER);
  }

  @Get('/:id')
  async getTaskById(
    @Param('id') id: string,
    @getUser() user: Users,
  ): Promise<Task> {
    return this.tasksService.getTaskbyID(id, user);
  }

  @Post()
  createTask(
    @Body() createTask: createTaskDto,
    @getUser() user: Users,
  ): Promise<Task> {
    this.logger.verbose(
      `User "${user.username}" creates task: ${JSON.stringify(createTask)}`,
    );
    return this.tasksService.createTask(createTask, user);
  }

  @Patch('/:id/status')
  async updateTaskStatusByID(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @getUser() user: Users,
  ): Promise<Task> {
    return this.tasksService.updateTaskById(
      id,
      updateTaskStatusDto.status,
      user,
    );
  }

  @Delete('/:id')
  async deleteTask(
    @Param('id') id: string,
    @getUser() user: Users,
  ): Promise<void> {
    return this.tasksService.deleteTaskById(id, user);
  }
}
