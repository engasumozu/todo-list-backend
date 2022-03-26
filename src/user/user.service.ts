import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDTO } from '../dtos/login.dto';
import { User } from '../types/user';
import { RegisterDTO } from "../dtos/register.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private userModel: Model<User>,
    ) { };

    async create(RegisterDTO: RegisterDTO) {
        const { email } = RegisterDTO;
        const user = await this.userModel.findOne({ email });
        if (user) {
            throw new HttpException('user already exists', HttpStatus.CONFLICT);
        }
        const createdUser = new this.userModel(RegisterDTO);
        await createdUser.save();
        return this.sanitizeUser(createdUser);
    }

    async findByPayload(payload) {
        const { email } = payload;
        return await this.userModel.findOne({ email });
    }

    async findByLogin(UserDTO: LoginDTO) {
        const { email, password } = UserDTO;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new HttpException('user doesnt exists', HttpStatus.NOT_FOUND);
        }
        if (await bcrypt.compare(password, user.password)) {
            return this.sanitizeUser(user)
        } else {
            throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
        }
    }

    sanitizeUser(user: User) {
        const sanitized = user.toObject();
        delete sanitized['password'];
        return sanitized;
    }
}
