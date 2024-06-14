import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDTO {
  @IsEmail({}, { message: 'email format not valid' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'password cant be empty' })
  password: string;
}
