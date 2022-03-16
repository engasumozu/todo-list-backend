import { Document } from 'mongoose';
import { Todo } from './todo';

export interface User extends Document {
    email: string;
    password: string;
    todo: Array<Todo>;
}