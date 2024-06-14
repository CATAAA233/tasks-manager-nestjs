import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptAdapter } from 'src/config/bcrypt';
import { LoginUserDTO } from 'src/modules/users/domain';
import { UsersService } from 'src/modules/users/presentation/service/users.service';
import { CustomError } from 'src/shared/domain';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async userlogIn(loginUserDTO: LoginUserDTO): Promise<string> {
    const user = await this.userService.getUserByEmail(loginUserDTO.email);

    const match = BcryptAdapter.compare(loginUserDTO.password, user.password);

    if (!match) throw CustomError.unAuthorized('Incorrect Password');

    const payload = { sub: user.id, username: user.name };
    return await this.jwtService.signAsync(payload);
  }
}
