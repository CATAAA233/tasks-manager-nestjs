import { TaskModel } from 'src/data/mysql/models/task.model';
import {
  CustomError,
  RegisterTaskDTO,
  TaskDatasource,
  TaskEntity,
  UpdateTaskDTO,
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
      });

      newTask.created_by = user;

      await newTask.save();
      const task = new TaskEntity(
        newTask.id,
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

  async getTasks(userID: string): Promise<TaskEntity[]> {
    const tasksDataSource = await TaskModel.find({
      where: {
        created_by: {
          id: userID,
        },
      },
      relations: ['created_by'],
    });

    const tasks = await tasksDataSource.map(
      (taskDataSource) =>
        new TaskEntity(
          taskDataSource.id,
          taskDataSource.title,
          taskDataSource.description,
          taskDataSource.status,
          taskDataSource.deadline,
          taskDataSource.created_by.name,
          taskDataSource.comments,
          taskDataSource.tags,
          taskDataSource.file,
        ),
    );

    return tasks;
  }

  async getTaskById(taskID: string): Promise<TaskEntity> {
    const taskDataSource = await TaskModel.findOne({
      where: {
        id: taskID,
      },
      relations: ['created_by'],
    });

    const task = await new TaskEntity(
      taskDataSource.id,
      taskDataSource.title,
      taskDataSource.description,
      taskDataSource.status,
      taskDataSource.deadline,
      taskDataSource.created_by.name,
      taskDataSource.comments,
      taskDataSource.tags,
      taskDataSource.file,
    );

    return task;
  }

  async updateTask(
    taskID: string,
    newData: Partial<UpdateTaskDTO>,
  ): Promise<TaskEntity> {
    const taskDataSource = await TaskModel.findOne({
      where: {
        id: taskID,
      },
      relations: ['created_by'],
    });

    if (!taskDataSource) throw CustomError.notFound('task not found');

    const taskUpdated = Object.assign(taskDataSource, newData);

    await taskUpdated.save();

    const task = await new TaskEntity(
      taskUpdated.id,
      taskUpdated.title,
      taskUpdated.description,
      taskUpdated.status,
      taskUpdated.deadline,
      taskUpdated.created_by.name,
      taskUpdated.comments,
      taskUpdated.tags,
      taskUpdated.file,
    );

    return task;
  }
}
