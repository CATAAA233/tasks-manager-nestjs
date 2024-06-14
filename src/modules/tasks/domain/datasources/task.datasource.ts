import { UserEntity } from 'src/modules/users/domain';
import { RegisterTaskDTO } from '../dto/register-task.dto';
import { TaskEntity } from '../entities/task.entity';

export abstract class TaskDatasource {
  abstract register(
    registerTaskDto: RegisterTaskDTO,
    user: UserEntity,
  ): Promise<TaskEntity>;

  abstract getTasks(userID: string): Promise<TaskEntity[]>;

  abstract getTaskById(userID: string): Promise<TaskEntity>;
}
