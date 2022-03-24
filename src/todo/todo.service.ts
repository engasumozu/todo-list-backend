import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../types/user';
import { Todo } from '../types/todo';

@Injectable()
export class TodoService {
    constructor(
        @InjectModel('Todo') private todoModel: Model<Todo>,
        @InjectModel('User') private userModel: Model<User>
    ) { };

    async getByUserId(userId: string) {
        const todo = await this.todoModel.find({ userId });
        if (!todo) {
            return {};
        }
        return todo;
    }

    async create(todo: Todo) {
        this.validateUser(todo.userId.toString());
        const createdTodo = new this.todoModel(todo);
        createdTodo.when = new Date(todo.when);
        try {
            await createdTodo.save();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
        return createdTodo;
    }

    async update(id: string, todo: Todo) {
        try {
            this.validateUser(todo.userId.toString());
            const updatedTodo = await this.todoModel.findByIdAndUpdate(id, todo, {
                new: true
            });

            if (!updatedTodo) {
                throw new HttpException("not todo found to be updated with id " + id, HttpStatus.NOT_FOUND);
            }

            return updatedTodo;

        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async delete(id: string) {
        try {
            const deletedTodo = await this.todoModel.findByIdAndDelete(id, {
                new: true
            });

            if (!deletedTodo) {
                throw new HttpException("not todo found to be deleted with id " + id, HttpStatus.NOT_FOUND);
            }

            return deletedTodo;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    validateUser(userId: string) {
        const user = this.userModel.findById(userId);
        if (!user) {
            throw new HttpException('user does not exist', HttpStatus.BAD_REQUEST);
        }
    }

}
