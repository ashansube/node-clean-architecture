import { ToDoRequestModel } from "../../models/todo";

export interface DeleteToDoUseCase {
    execute(id: String): Promise<void>;
}