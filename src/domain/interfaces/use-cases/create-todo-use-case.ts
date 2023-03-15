import { ToDoRequestModel } from "../../models/todo";

export interface CreateToDoUseCase {
    execute(ToDo: ToDoRequestModel): void;
}