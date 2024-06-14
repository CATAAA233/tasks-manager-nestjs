import { Module } from '@nestjs/common';
import { UserRepositoryImpl } from '../infrastructure/repository/user.repository.impl';
import { UserDatasourceImpl } from '../infrastructure/datasource/user.datasource.impl';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'UserDatasource',
      useClass: UserDatasourceImpl,
    },
    {
      provide: 'UserRepository',
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [UsersService], // Exportar si es necesario en otros módulos
})
export class UsersModule {}
