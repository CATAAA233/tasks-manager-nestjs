import { RegisterTaskDTO } from "../dto/tasks/register-task.dto";
import { TaskEntity } from "../entities/task.entity";

export abstract class TaskDatasource{

    abstract register(registerTaskDto: RegisterTaskDTO):Promise<TaskEntity>
}