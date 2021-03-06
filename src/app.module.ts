import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose/dist/mongoose.module";
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { TodoModule } from './todo/todo.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI, {}),
    UserModule,
    AuthorizationModule,
    TodoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
