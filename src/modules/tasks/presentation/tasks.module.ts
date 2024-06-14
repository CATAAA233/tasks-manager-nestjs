import { Module } from '@nestjs/common';
import { TasksController } from './controller/tasks.controller';
import { TasksService } from './service/tasks.service';
import { TaskDatasourceImpl, TaskRepositoryImpl } from '../infrastructure';
import { UsersModule } from 'src/modules/users/presentation/users.module';

@Module({
  imports: [UsersModule],
  controllers: [TasksController],
  providers: [
    TasksService,
    { provide: 'TaskDatasource', useClass: TaskDatasourceImpl },
    { provide: 'TaskRepository', useClass: TaskRepositoryImpl },
  ],
  exports: [TasksService],
})
export class TasksModule {}
