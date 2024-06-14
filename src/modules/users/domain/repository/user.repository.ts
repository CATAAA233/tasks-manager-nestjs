import { registerUserDTO } from '../dto/register-user.dto';
import { UserEntity } from '../entity/user.entity';

export abstract class UserRepository {
  abstract register(registerUserDTO: registerUserDTO): Promise<UserEntity>;
}
