import { ToDoDataSource } from "../../data/interfaces/data-sources/todo-data-source";
import { ToDoRequestModel, ToDoResponseModel } from "../models/todo";
import { ToDoRepository } from "../interfaces/repositories/todo-repository";

export class ToDoRepositoryImpl implements ToDoRepository {
    ToDoDataSource: ToDoDataSource
    constructor(ToDoDataSource: ToDoDataSource) {
        this.ToDoDataSource = ToDoDataSource
    }
    async deleteToDo(id: String) {
        await this.ToDoDataSource.deleteOne(id)
    }

    async updateToDo(id: string, data: ToDoRequestModel): Promise<ToDoResponseModel | null> {
        await this.ToDoDataSource.updateOne(id, data);
        const result = await this.ToDoDataSource.getOne(id);
        if (!result) {
          return null;
        }
        return {
          _id: result._id,
          name: result.name,
          description: result.description
        };
    }

    async getToDo(id: String): Promise<ToDoResponseModel | null> {
        const result = await this.ToDoDataSource.getOne(id);
        if (!result) {
          return null;
        }
        return {
          _id: result._id,
          name: result.name,
          description: result.description
        };
    }

    async createToDo(ToDo: ToDoRequestModel) {
        await this.ToDoDataSource.create(ToDo)

    }
    async getToDos(): Promise<ToDoResponseModel[]> {
        const result = await this.ToDoDataSource.getAll()
        return result;
    }
}