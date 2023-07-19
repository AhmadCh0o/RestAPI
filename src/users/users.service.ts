import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserNotFoundException } from './Exceptions/userNotFound.exception';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Get all users
  allUsers() {
    return this .prisma.users.findMany();
  }

  // Create a new user
  async create(createUserDto: CreateUserDto) {
    const password = encodePassword(createUserDto.password);
    console.log(password);
    try {
      return await this.prisma.users.create({
        data: {
          ...createUserDto,
          password: password,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        if (error.meta?.target?.includes('username')) {
          throw new ConflictException('Username already exists');
        } else if (error.meta?.target?.includes('email')) {
          throw new ConflictException('Email already exists');
        }
      }
      throw error;
    }
  }

  // Get user by ID
  getUserById(id: number) {
    return this.prisma.users.findUnique({ where: { id } });
  }

  // Find user by username
  findOneByUsername(username: string) {
    return this.prisma.users.findUnique({ where: { username } });
  } 

  // Find user(s) by name
  getUserByName(name: string) {
    return this.prisma.users.findMany({ where: { name } })
  }

  // Update user by ID
  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.prisma.users.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        if (error.meta?.target?.includes('username')) {
          throw new ConflictException('Username already exists');
        } else if (error.meta?.target?.includes('email')) {
          throw new ConflictException('Email already exists');
        }
      }
      throw error;
    }
  }

  // Delete user by ID
  remove(id: number) {
    return this.prisma.users.delete({ where: { id } });
  }

  // Find user by email
  async findByEmail(email: string) {
    return this.prisma.users.findUnique({ where: { email: email } });
  }

  // Change user's password by ID
  async changePassword(id: number, changePasswordDto: ChangePasswordDto) {
    try {
      return await this.prisma.users.update({
        where: { id },
        data: changePasswordDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        if (error.meta?.target?.includes('username')) {
          throw new ConflictException('Username already exists');
        } else if (error.meta?.target?.includes('email')) {
          throw new ConflictException('Email already exists');
        }
      }
      throw error;
    }
  }
}