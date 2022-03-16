import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from 'src/utils/jwt.util';

@Module({
  providers: [AuthorizationService, JwtStrategy],
  controllers: [AuthorizationController],
  imports: [UserModule]
})
export class AuthorizationModule {}
