import { RegisterTaskDTO } from '../dto/register-task.dto';
import { TaskEntity } from '../entities/task.entity';

export abstract class TaskDatasource {
  abstract register(registerTaskDto: RegisterTaskDTO): Promise<TaskEntity>;
}
