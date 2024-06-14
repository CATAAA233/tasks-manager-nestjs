import { Inject, Injectable } from '@nestjs/common';
import { RegisterUserDTO, UserEntity, UserRepository } from '../../domain';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  registerUser(registerUserDTO: RegisterUserDTO): Promise<UserEntity> {
    return this.userRepository.register(registerUserDTO);
  }
}
