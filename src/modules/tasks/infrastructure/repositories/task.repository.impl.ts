import { Inject } from '@nestjs/common';
import {
  RegisterTaskDTO,
  TaskDatasource,
  TaskEntity,
  TaskRepository,
  UpdateTaskDTO,
} from '../../domain';
import { UserEntity } from 'src/modules/users/domain';

export class TaskRepositoryImpl implements TaskRepository {
  constructor(
    @Inject('TaskDatasource') private readonly taskDataSource: TaskDatasource,
  ) {}

  getTaskById(taskID: string): Promise<TaskEntity> {
    return this.taskDataSource.getTaskById(taskID);
  }

  getTasks(userID: string): Promise<TaskEntity[]> {
    return this.taskDataSource.getTasks(userID);
  }

  register(
    registerTaskDto: RegisterTaskDTO,
    user: UserEntity,
  ): Promise<TaskEntity> {
    return this.taskDataSource.register(registerTaskDto, user);
  }

  updateTask(
    taskID: string,
    taskData: Partial<UpdateTaskDTO>,
  ): Promise<TaskEntity> {
    return this.taskDataSource.updateTask(taskID, taskData);
  }
}
