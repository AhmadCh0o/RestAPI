import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty,  } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

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
