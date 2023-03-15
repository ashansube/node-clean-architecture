import { ToDoResponseModel } from "../../models/todo";

export interface GetOneToDoUseCase {
    execute(id: String): Promise<ToDoResponseModel | null>;
}