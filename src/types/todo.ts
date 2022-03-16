import { Document } from 'mongoose';

export interface Todo extends Document {
    todo: string;
    description: string;
    priority: number;
    when: Date;
}