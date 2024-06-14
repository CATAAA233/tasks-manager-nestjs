import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginUserDTO } from 'src/modules/users/domain';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() loginUserDTO: LoginUserDTO): Promise<string> {
    return await this.authService.userlogIn(loginUserDTO);
  }
}
