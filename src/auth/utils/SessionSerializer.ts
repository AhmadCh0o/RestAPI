import { Inject } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { UsersService } from "src/users/users.service";

export class SessionSerializer extends PassportSerializer {

    constructor(
        @Inject('User_SERVICE') private readonly userService: UsersService,
    ) {
        super();
    }

    serializeUser() {
        
    }

    deserializeUser() {
        
    }
}