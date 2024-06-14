import { Body, Controller, Logger, Post } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { RegisterUserDTO } from '../../domain';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @Post()
  registerUser(@Body() registerUserData: RegisterUserDTO) {
    this.logger.log('Attemping to register new user');
    return this.usersService.registerUser(registerUserData);
  }
}
