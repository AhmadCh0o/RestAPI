import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { PrismaModule } from '../prisma/prisma.module'; // Correct the file path for PrismaModule
import { UsersModule } from '../users/users.module'; // Correct the file path for UsersModule
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './utils/localStrategy';
import { SessionSerializer } from './utils/SessionSerializer';

@Module({
  imports: [PrismaModule, UsersModule, PassportModule.register({
    session: true,
  })], // Import the PrismaModule and UsersModule here
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
    LocalStrategy,
    SessionSerializer,
  ],
})
export class AuthModule {}
