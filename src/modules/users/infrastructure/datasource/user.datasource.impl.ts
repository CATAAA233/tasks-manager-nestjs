import { CustomError } from 'src/shared/domain';
import { UserDatasource, UserEntity, registerUserDTO } from '../../domain';

export class UserDatasourceImpl implements UserDatasource {
  async register(registerUserDTO: registerUserDTO): Promise<UserEntity> {
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
