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

  getUserByID(userID: string): Promise<UserEntity> {
    return this.userDataSource.getUserByID(userID);
  }

  getUserByEmail(email: string): Promise<UserEntity> {
    return this.userDataSource.getUserByEmail(email);
  }
}
