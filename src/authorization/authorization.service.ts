import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UserService } from "../user/user.service";

@Injectable()
export class AuthorizationService {
    constructor(private userService: UserService) { }

    async signPayload(payload) {
        return sign(payload, process.env.SECRET_KEY, { 'expiresIn': '7d' });
    }

    async validateUser(payload) {
        return await this.userService.findByPayload(payload);
    }
}
