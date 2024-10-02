/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'John Doe', description: "Le nom de l'utilisateur" })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'john@gmail.com',
    description: "Email de l'utilisateur",
  })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    example: 'strongPassword123',
    description: "Le mot de passe de l'utilisateur",
  })
  password: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    example: 'strongPassword123',
    description: "Confirmer le mot de passe de l'utilisateur",
  })
  confirm_password: string;
}
