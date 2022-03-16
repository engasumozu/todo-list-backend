import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';

@Controller('todo')
export class TodoController {
    
    @Get("/user/:userid")
    @UseGuards(AuthGuard("jwt"))
    async getAllByUserId(@Param('userid') userid: string) {
        return [
            {
                todo:"Mango tasks",
                descrption:"MangoChango interview test " + userid,
                priority:3,
                when:"18/03/2022"
            }
        ];
    }
}
