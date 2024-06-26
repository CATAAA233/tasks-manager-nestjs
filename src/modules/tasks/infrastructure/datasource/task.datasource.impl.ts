import { TaskModel } from 'src/data/mysql/models/task.model';
import {
  CustomError,
  RegisterTaskDTO,
  TaskDatasource,
  TaskEntity,
  UpdateTaskDTO,
} from '../../domain';
import { UserModel } from 'src/data/mysql/models/user.model';
import { CommentModel } from 'src/data/mysql/models/comments.model';
import { CommentEntity } from '../../domain/entities/comment.entity.';
import { TagsModel } from 'src/data/mysql/models/tags.model';
import { TagsEntity } from '../../domain/entities/tags.entity';

export class TaskDatasourceImpl implements TaskDatasource {
  async register(
    registerTaskDto: RegisterTaskDTO,
    user: UserModel,
  ): Promise<TaskEntity> {
    try {
      const newTask = Object.assign(new TaskModel(), {
        title: registerTaskDto.title,
        description: registerTaskDto.description,
        deadline: registerTaskDto.deadline,
        status: registerTaskDto.status,
      });

      newTask.created_by = user;
      await newTask.save();

      let comments = [];
      let tags = [];

      if (registerTaskDto.comments) {
        comments = await Promise.all(
          registerTaskDto.comments.map(async (comment) => {
            const commentDataSource = new CommentModel();
            commentDataSource.title = comment;
            commentDataSource.task = newTask;
            await commentDataSource.save();

            return new CommentEntity({
              id: commentDataSource.id,
              title: commentDataSource.title,
            });
          }),
        );
      }

      if (registerTaskDto.tags) {
        tags = await Promise.all(
          registerTaskDto.tags.map(async (tag) => {
            const tagDataSource = new TagsModel();
            tagDataSource.title = tag;
            tagDataSource.task = newTask;
            await tagDataSource.save();

            return new TagsEntity({
              id: tagDataSource.id,
              title: tagDataSource.title,
            });
          }),
        );
      }

      const task = new TaskEntity({
        id: newTask.id,
        title: newTask.title,
        description: newTask.description,
        status: newTask.status,
        deadline: newTask.deadline,
        created_by: newTask.created_by.name,
        comments: comments,
        tags: tags,
        file: newTask.file,
      });

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
    try {
      const tasksDataSource = await TaskModel.find({
        where: {
          created_by: {
            id: userID,
          },
        },
        relations: ['created_by', 'comments', 'tags'],
      });

      const tasks = await tasksDataSource.map(
        (taskDataSource) =>
          new TaskEntity({
            id: taskDataSource.id,
            title: taskDataSource.title,
            description: taskDataSource.description,
            status: taskDataSource.status,
            deadline: taskDataSource.deadline,
            created_by: taskDataSource.created_by.name,
            comments: taskDataSource.comments,
            tags: taskDataSource.tags,
            file: taskDataSource.file,
          }),
      );

      return tasks;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      console.log(error);
      throw CustomError.internalServer();
    }
  }

  async getTaskById(taskID: string): Promise<TaskEntity> {
    try {
      const taskDataSource = await TaskModel.findOne({
        where: {
          id: taskID,
        },
        relations: ['created_by', 'comments', 'tags'],
      });

      if (!taskDataSource) throw CustomError.notFound('task not found');

      const task = new TaskEntity({
        id: taskDataSource.id,
        title: taskDataSource.title,
        description: taskDataSource.description,
        status: taskDataSource.status,
        deadline: taskDataSource.deadline,
        created_by: taskDataSource.created_by.name,
        comments: taskDataSource.comments,
        tags: taskDataSource.tags,
        file: taskDataSource.file,
      });

      return task;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      console.log(error);
      throw CustomError.internalServer();
    }
  }

  async updateTask(
    taskID: string,
    newData: Partial<UpdateTaskDTO>,
  ): Promise<TaskEntity> {
    try {
      const taskDataSource = await TaskModel.findOne({
        where: {
          id: taskID,
        },
        relations: ['created_by', 'comments', 'tags'],
      });

      if (!taskDataSource) throw CustomError.notFound('task not found');

      const taskUpdated = Object.assign(taskDataSource, newData);

      await taskUpdated.save();

      const task = await new TaskEntity({
        id: taskDataSource.id,
        title: taskDataSource.title,
        description: taskDataSource.description,
        status: taskDataSource.status,
        deadline: taskDataSource.deadline,
        created_by: taskDataSource.created_by.name,
        comments: taskDataSource.comments,
        file: taskDataSource.file,
      });

      return task;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      console.log(error);
      throw CustomError.internalServer();
    }
  }

  async deleteTask(taskID: string): Promise<string> {
    try {
      const taskDataSource = await TaskModel.findOne({
        where: {
          id: taskID,
        },
        relations: ['created_by', 'comments', 'tags'],
      });

      if (!taskDataSource) throw CustomError.notFound('task not found');

      await taskDataSource.comments.map((comment) => {
        comment.remove();
      });

      await taskDataSource.tags.map((tag) => {
        tag.remove();
      });

      await taskDataSource.remove();

      return 'Tasks deleted successfully';
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      console.log(error);
      throw CustomError.internalServer();
    }
  }
}
