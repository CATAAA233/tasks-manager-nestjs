import { RegisterUserDTO } from '../dto/register-user.dto';
import { UserEntity } from '../entity/user.entity';

export abstract class UserRepository {
  abstract register(registerUserDTO: RegisterUserDTO): Promise<UserEntity>;

  abstract getUserByID(userID: string): Promise<UserEntity>;

  abstract getUserByEmail(userID: string): Promise<UserEntity>;
}
