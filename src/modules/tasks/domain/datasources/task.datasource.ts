import { UserEntity } from 'src/modules/users/domain';
import { RegisterTaskDTO } from '../dto/register-task.dto';
import { TaskEntity } from '../entities/task.entity';
import { UpdateTaskDTO } from '../dto/update-task.dto';

export abstract class TaskDatasource {
  abstract register(
    registerTaskDto: RegisterTaskDTO,
    user: UserEntity,
  ): Promise<TaskEntity>;

  abstract getTasks(userID: string): Promise<TaskEntity[]>;

  abstract getTaskById(taskID: string): Promise<TaskEntity>;

  abstract updateTask(
    TaskID: string,
    newData: Partial<UpdateTaskDTO>,
  ): Promise<TaskEntity>;

  abstract deleteTask(taskID: string): Promise<string>;
}
