import * as mongoose from "mongoose";

export const TodoSchema = new mongoose.Schema({
    userId: { type: String, required: true},
    todo: { type: String, required: true},
    description: { type: String, required: false},
    priority: { type: String, required: false},
    when: { type: Date, required: true},
})