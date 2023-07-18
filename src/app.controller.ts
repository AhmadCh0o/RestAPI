import { Controller, Get, Post, Request, UseGuards  } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards()
  @Post('login')
  login(@Request() req): any {
    return { msg: 'Logged in!' };
  }

  @UseGuards()
  @Get()
  getHello(@Request() req): string {
    return req.user;
  }
}
