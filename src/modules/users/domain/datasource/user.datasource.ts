import { UserEntity } from '..';
import { RegisterUserDTO } from '../dto/register-user.dto';

export abstract class UserDatasource {
  abstract register(registerUserDto: RegisterUserDTO): Promise<UserEntity>;

  abstract getUserByID(userID: string): Promise<UserEntity>;

  abstract getUserByEmail(userID: string): Promise<UserEntity>;
}
