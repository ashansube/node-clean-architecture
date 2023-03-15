import { ToDoRequestModel, ToDoResponseModel } from "../../models/todo";

export interface UpdateToDoUseCase {
    execute(id: string, data: ToDoRequestModel): Promise<ToDoResponseModel | null>;
}