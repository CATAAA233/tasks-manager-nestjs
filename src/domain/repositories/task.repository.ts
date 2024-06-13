import { RegisterTaskDTO } from '../dto/tasks/register-task.dto';
import { TaskEntity } from '../entities/task.entity';

export abstract class TaskRepository {
  abstract register(registerTaskDto: RegisterTaskDTO): Promise<TaskEntity>;
}
