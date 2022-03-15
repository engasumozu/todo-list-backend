import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthorizationService {
    constructor() { }

    async signPayload(payload) {
        return sign(payload, process.env.SECRET_KEY, {'expiresIn': '7d'});
    }
}
