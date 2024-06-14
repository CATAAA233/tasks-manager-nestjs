import { CustomError } from 'src/shared/domain';
import { UserDatasource, UserEntity, RegisterUserDTO } from '../../domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserDatasourceImpl implements UserDatasource {
  async register(registerUserDTO: RegisterUserDTO): Promise<UserEntity> {
    const { name, email, password } = registerUserDTO;

    try {
      return new UserEntity(name, email, password);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }
}
