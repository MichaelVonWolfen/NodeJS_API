import { Test } from '@nestjs/testing';
import { taskStatus } from './task-status.enum';
import { TasksRepository } from './task.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});
const mockUser = {
  username: 'Ariel',
  id: 'someID',
  password: 'Something',
  tasks: [],
};
describe('Task service', () => {
  let taskService: TasksService;
  let taskRepository;

  beforeEach(async () => {
    //init NestJS module with tasksService and TaskRepository
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TasksRepository,
          useFactory: mockTasksRepository,
        },
      ],
    }).compile();
    taskService = module.get(TasksService);
    taskRepository = module.get(TasksRepository);
  });
  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and return the results', async () => {
      taskRepository.getTasks.mockResolvedValue('someValue');
      //call taskRepository.getTasks
      const result = await taskService.getTasks(null, mockUser);
      expect(result).toEqual('someValue');
    });
  });
  describe('getTaskNyID', () => {
    it('calls TasksRepository.findOne and return the results', async () => {
      const moxkTak = {
        title: 'med',
        describtion: 'wreygh',
        id: 'sdopigjn',
        status: taskStatus.OPEN,
      };
      taskRepository.findOne.mockResolvedValue(moxkTak);
      //call taskRepository.getTasks
      const result = await taskService.getTaskbyID('sdopigjn');
      expect(result).toEqual(moxkTak);
    });
  });
});
