import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySQLDatabase } from './data/mysql';
import { UsersModule } from './modules/users/presentation/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(MySQLDatabase.CreateDataSource()),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
