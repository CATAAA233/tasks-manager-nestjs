import { CustomError } from 'src/shared/domain';
import { UserDatasource, UserEntity, RegisterUserDTO } from '../../domain';
import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/data/mysql/models/user.model';
import { BcryptAdapter } from 'src/config/bcrypt';

@Injectable()
export class UserDatasourceImpl implements UserDatasource {
  async register(registerUserDTO: RegisterUserDTO): Promise<UserEntity> {
    const { email, password } = registerUserDTO;
    try {
      const exist = await UserModel.findOne({ where: { email } });
      if (exist) throw CustomError.badRequest('User alredy exist');

      const newUser = Object.assign(new UserModel(), {
        ...registerUserDTO,
        password: BcryptAdapter.hash(password),
      });

      return await newUser.save();
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }

  async getUserByID(userID: string): Promise<UserEntity> {
    if (!userID) throw CustomError.badRequest('you must enter a user id');

    const user = await UserModel.findOne({ where: { id: userID } });
    return user;
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    if (!email) throw CustomError.badRequest('you must enter a email');

    const user = await UserModel.findOne({ where: { email } });
    return user;
  }
}
