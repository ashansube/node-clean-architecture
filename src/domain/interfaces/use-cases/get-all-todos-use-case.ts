import { ToDoResponseModel } from "../../models/todo";

export interface GetAllToDoUseCase {
    execute(): Promise<ToDoResponseModel[]>;
}