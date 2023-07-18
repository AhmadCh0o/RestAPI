import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
// import { ValidateUserMiddleWare } from './middlewares/validate-user.middleware';

@Module({
  controllers: [UsersController],
  providers: [{
    provide: 'USER_SERVICE', // Use the provided key
    useClass: UsersService,
  }],
  exports: ['USER_SERVICE'], // Export the provided key
  imports: [PrismaModule],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(ValidateUserMiddleWare)
    // .forRoutes({
      // path: 'users/:username',
      // method: RequestMethod.GET,
    // })
  }
}
