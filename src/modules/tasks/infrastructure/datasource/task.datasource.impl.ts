import { TaskModel } from 'src/data/mysql/models/task.model';
import {
  CustomError,
  RegisterTaskDTO,
  TaskDatasource,
  TaskEntity,
} from '../../domain';
import { UserModel } from 'src/data/mysql/models/user.model';

export class TaskDatasourceImpl implements TaskDatasource {
  async register(
    registerTaskDto: RegisterTaskDTO,
    user: UserModel,
  ): Promise<TaskEntity> {
    try {
      const newTask = Object.assign(new TaskModel(), {
        ...registerTaskDto,
        comments: 'this is a comment',
        tags: 'this is a tag',
        file: 'this is a file URL',
      });

      newTask.created_by = user;

      await newTask.save();
      const task = new TaskEntity(
        newTask.title,
        newTask.description,
        newTask.status,
        newTask.deadline,
        newTask.created_by.name,
      );

      return task;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      console.log(error);
      throw CustomError.internalServer();
    }
  }
}
