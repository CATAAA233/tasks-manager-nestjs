import { Inject } from '@nestjs/common';
import {
  RegisterUserDTO,
  UserDatasource,
  UserEntity,
  UserRepository,
} from '../../domain';

export class UserRepositoryImpl implements UserRepository {
  constructor(
    @Inject('UserDatasource') private readonly userDataSource: UserDatasource,
  ) {}

  register(registerUserDTO: RegisterUserDTO): Promise<UserEntity> {
    return this.userDataSource.register(registerUserDTO);
  }
}
