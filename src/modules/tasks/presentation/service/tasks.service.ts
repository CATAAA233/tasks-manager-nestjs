import { Inject, Injectable } from '@nestjs/common';
import { RegisterTaskDTO, TaskRepository, UpdateTaskDTO } from '../../domain';
import { UsersService } from 'src/modules/users/presentation/service/users.service';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TaskRepository') private readonly taskRepository: TaskRepository,
    private readonly userService: UsersService,
  ) {}

  async getTaskByID(taskID: string) {
    const task = await this.taskRepository.getTaskById(taskID);
    return task;
  }

  async getTasksList(userID: string) {
    const newTask = await this.taskRepository.getTasks(userID);
    return newTask;
  }

  async registerTask(registerTaskData: RegisterTaskDTO, userID: string) {
    const user = await this.userService.getUserByID(userID);
    const newTask = await this.taskRepository.register(registerTaskData, user);
    return newTask;
  }

  async updateTask(taskID: string, taskData: Partial<UpdateTaskDTO>) {
    return await this.taskRepository.updateTask(taskID, taskData);
  }

  async deleteTask(taskID: string) {
    return await this.taskRepository.deleteTask(taskID);
  }
}
