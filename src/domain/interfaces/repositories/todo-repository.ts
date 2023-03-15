import { ToDoRequestModel, ToDoResponseModel } from "../../models/todo";

export interface ToDoRepository {
    createToDo(ToDo: ToDoRequestModel): void;
    deleteToDo(id: String): void;
    updateToDo(id: String, data: ToDoRequestModel): Promise<ToDoResponseModel | null>;
    getToDos(): Promise<ToDoResponseModel[]>;
    getToDo(id: String): Promise<ToDoResponseModel | null>;
}