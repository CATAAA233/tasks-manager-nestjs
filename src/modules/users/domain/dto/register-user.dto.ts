import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterUserDTO {
  @IsString()
  @IsNotEmpty({ message: 'you must enter a name' })
  @Length(2, 30, {
    message: 'name must have greather than 2 and less than 30 characters',
  })
  name: string;

  @IsEmail({}, { message: 'El email no es válido' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'password cant be empty' })
  @Length(6, 20, {
    message: 'name must have greather than 6 and less than 20 characters',
  })
  password: string;
}
