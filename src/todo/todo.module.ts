import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { TodoSchema } from '../schemas/todo.schema';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
    imports: [
        MongooseModule.forFeature(
            [
                { name: 'Todo', schema: TodoSchema },
                { name: 'User', schema: UserSchema }
            ]
        )
    ],
    providers: [TodoService],
    controllers: [TodoController],
    exports: [TodoService]
})
export class TodoModule { }
