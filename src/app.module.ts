import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySQLDatabase } from './data/mysql';
import { UsersModule } from './modules/users/presentation/users.module';
import { AuthModule } from './modules/auth/presentation/auth.module';
import { TasksModule } from './modules/tasks/presentation/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(MySQLDatabase.CreateDataSource()),
    UsersModule,
    AuthModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
