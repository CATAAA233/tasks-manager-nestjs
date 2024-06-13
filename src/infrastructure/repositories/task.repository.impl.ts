import { RegisterTaskDTO, TaskDatasource, TaskEntity, TaskRepository } from "../../domain";


export class TaskRepositoryImpl implements TaskRepository{
    constructor(
        private readonly taskDataSource: TaskDatasource
    ){
    }
    
    
    register(registerTaskDto: RegisterTaskDTO): Promise<TaskEntity> {
        return this.taskDataSource.register(registerTaskDto)
    }
}