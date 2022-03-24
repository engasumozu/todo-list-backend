import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { LoginDTO } from '../dtos/login.dto';
import { RegisterDTO } from '../dtos/register.dto';
import { UserService } from '../user/user.service';
import { AuthorizationService } from './authorization.service';

@Controller('authorization')
export class AuthorizationController {
    constructor(
        private userService: UserService,
        private authorizationService: AuthorizationService,
    ) { }

    @Post('register')
    async register(@Body() registerDTO: RegisterDTO) {
        const user = await this.userService.create(registerDTO);
        const payload = {
            email: user.email
        }

        const token = await this.authorizationService.signPayload(payload);
        return { user, token }
    }

    @Post('login')
    async login(@Body() loginDto: LoginDTO) {
        const user = await this.userService.findByLogin(loginDto);
        const payload = {
            email: user.email
        };

        const token = await this.authorizationService.signPayload(payload);
        return { user, token };
    }
}
