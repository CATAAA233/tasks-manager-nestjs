import { UserEntity } from '..';
import { registerUserDTO } from '../dto/register-user.dto';

export abstract class UserDatasource {
  abstract register(registerUserDto: registerUserDTO): Promise<UserEntity>;
}
