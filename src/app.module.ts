import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySQLDatabase } from './data/mysql';

@Module({
  imports: [TypeOrmModule.forRoot(MySQLDatabase.CreateDataSource())],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
