import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { UserModule } from '../user/user.module';

@Module({
  providers: [AuthorizationService],
  controllers: [AuthorizationController],
  imports: [UserModule]
})
export class AuthorizationModule {}
