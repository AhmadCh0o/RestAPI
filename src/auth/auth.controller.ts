import { Controller, Get, Post, Request, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { session } from 'passport';

@Controller('auth')
export class AuthController {


    @UseGuards(AuthGuard('local'))
    @Post('login') 
    async login(@Request() req) {

    }

    @Get('')
    async getAuthSession(@Session() session: Record<string, any> ) {
        console.log(session);
        console.log(session.id);
        session.authenticated = true;
        return session;
    }

}