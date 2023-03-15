import { ToDoRequestModel, ToDoResponseModel } from "../../../domain/models/todo";

export interface ToDoDataSource {
    create(ToDo: ToDoRequestModel): void;
    getAll(): Promise<ToDoResponseModel[]>;
    deleteOne(id: String): Promise<void>;
    updateOne(id: string, data: ToDoRequestModel): Promise<ToDoResponseModel | null>;
    getOne(id: String): Promise<ToDoResponseModel | null>;
}