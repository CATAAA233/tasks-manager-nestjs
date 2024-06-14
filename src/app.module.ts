import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySQLDatabase } from './data/mysql';
import { UsersModule } from './modules/users/presentation/users.module';
import { AuthModule } from './modules/auth/presentation/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(MySQLDatabase.CreateDataSource()),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
