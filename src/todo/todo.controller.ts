import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { Todo } from '../types/todo';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {

    constructor(private todoService: TodoService) { }

    @Get("/user/:userid")
    @UseGuards(AuthGuard("jwt"))
    async getAllByUserId(@Param('userid') userid: string) {
        return this.todoService.getByUserId(userid);
    }

    @Post("")
    @UseGuards(AuthGuard("jwt"))
    async create(@Body() todo: Todo) {
        return this.todoService.create(todo);
    }

    @Put("/:id")
    @UseGuards(AuthGuard("jwt"))
    async update(@Param('id') id: string, @Body() todo: Todo) {
        return this.todoService.update(id, todo);
    }

    @Delete("/:id")
    @UseGuards(AuthGuard("jwt"))
    async delete(@Param('id') id: string) {
        return this.todoService.delete(id);
    }


}
