import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty,  } from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty()
    @ApiProperty()
    name: string;
  
    @IsNotEmpty()
    @ApiProperty()
    username: string;

    @IsEmail()
    @ApiProperty()
    email: string;
  
    @IsNotEmpty()
    @ApiProperty()
    password: string;
}
