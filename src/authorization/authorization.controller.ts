import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from '../dtos/login.dto';
import { RegisterDTO } from '../dtos/register.dto';
import { UserService } from '../user/user.service';
import { AuthorizationService } from './authorization.service';

@Controller('authorization')
export class AuthorizationController {
    constructor(
        private userService: UserService,
        private authService: AuthorizationService,
    ) { }

    @Post('register')
    async register(@Body() registerDTO: RegisterDTO) {
        const user = await this.userService.create(registerDTO);
        const payload = {
            email: user.email
        }

        const token = await this.authService.signPayload(payload);
        return { user, token }
    }

    @Post('login')
    async login(@Body() loginDto: LoginDTO){
        const user = await this.userService.findByLogin(loginDto);
        const payload = {
            email: user.email
        };

        const token = await this.authService.signPayload(payload);
        return { user, token };
    }
}
