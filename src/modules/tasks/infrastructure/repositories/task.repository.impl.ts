import { Inject } from '@nestjs/common';
import {
  RegisterTaskDTO,
  TaskDatasource,
  TaskEntity,
  TaskRepository,
} from '../../domain';
import { UserEntity } from 'src/modules/users/domain';

export class TaskRepositoryImpl implements TaskRepository {
  constructor(
    @Inject('TaskDatasource') private readonly taskDataSource: TaskDatasource,
  ) {}

  register(
    registerTaskDto: RegisterTaskDTO,
    user: UserEntity,
  ): Promise<TaskEntity> {
    return this.taskDataSource.register(registerTaskDto, user);
  }
}
