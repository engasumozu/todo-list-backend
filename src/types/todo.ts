import * as mongoose from 'mongoose';

export interface Todo extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    todo: string;
    description: string;
    priority: number;
    when: Date;
}