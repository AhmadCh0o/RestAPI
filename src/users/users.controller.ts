import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ForbiddenException, UsePipes, ValidationPipe, Inject, HttpException, HttpStatus, UseInterceptors, ClassSerializerInterceptor, ParseIntPipe, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SerializedUser } from './entities';
import { UserNotFoundException } from './Exceptions/userNotFound.exception';
import { ChangePasswordDto } from './dto/changePassword.dto';

@Controller('users')
export class UsersController {
  constructor(@Inject('USER_SERVICE') private readonly usersService: UsersService) {}

  // Get all users
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('')
  async getUsers() {
    const users = await this.usersService.allUsers();
    const serializedUsers = users.map(user => new SerializedUser(user));
    return serializedUsers;
  
  }
 
  // Create user
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('create')
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: CreateUserDto) {
    const createdUser =  await this.usersService.create(createUserDto);
    if (createdUser) return new SerializedUser(createdUser);
    else throw new HttpException('User was not created, Try again', HttpStatus.BAD_REQUEST);
  }

  // Get user by ID
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.getUserById(id);
    if (user) return new SerializedUser(user);
    else throw new UserNotFoundException('User was not found', HttpStatus.BAD_REQUEST);
  }

  // Get user by username
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards()
  @Get('username/:username')
  async findOneByUsername(@Param('username') username: string) {
    const user = await this.usersService.findOneByUsername(username);
    if (user) return new SerializedUser(user);
    else throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
  }

  // Get user by name
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards()
  @Get('name/:name')
  async getByName(@Param('name') name: string) {
    const users = await this.usersService.getUserByName(name);
    const serializedUsers = users.map(user => new SerializedUser(user));
    if (serializedUsers.length > 0) return serializedUsers;
    else throw new HttpException('No User With This Name', HttpStatus.BAD_REQUEST);
  }

  // Update user by ID
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards()
  @Patch(':id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updateUser =  await this.usersService.update(+id, updateUserDto);
    if (updateUser) return new SerializedUser(updateUser);
    else throw new HttpException('Cannot update user, Try again', HttpStatus.BAD_REQUEST);
  }

  // Delete user by ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  // Find user by email
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    const user = await this.usersService.findByEmail(email);
    if (user) return new SerializedUser(user);
    else throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
  }

  // Change user's password by ID
  @Patch(':id/password')
  changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    this.usersService.changePassword(id, changePasswordDto);
    return { message: 'Password changed successfully' };
  }
}