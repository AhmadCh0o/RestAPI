import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
  ],
  exports: ['USER_SERVICE'],
  imports: [PrismaModule], // Import the PrismaModule here
})
export class UsersModule {}