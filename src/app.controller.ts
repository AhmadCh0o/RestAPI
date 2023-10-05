import { Controller, Get, Post, Request, UseGuards  } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}



  @UseGuards()
  @Get()
  getHello(@Request() req): string {
    return req.user;
  }
}