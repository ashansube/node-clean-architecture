import { ToDoRequestModel, ToDoResponseModel } from "../../../domain/models/todo";
import { ToDoDataSource } from "../../interfaces/data-sources/todo-data-source";
import todoModel from '../mongodb/schema/todo-schema';

export class MongoDBToDoDataSource implements ToDoDataSource {

    async deleteOne(id: String): Promise<void> {
        await todoModel.findByIdAndDelete(id);
    }

    async updateOne(id: String, data: ToDoRequestModel): Promise<ToDoResponseModel | null> {
        const updatedTodo = await todoModel.findByIdAndUpdate(id, data, { new: true });
        if (!updatedTodo) {
          return null;
        }
        return {
          _id: updatedTodo.id,
          name: updatedTodo.name,
          description: updatedTodo.description,
        };
    }

    async create(ToDo: ToDoRequestModel) {
        const result=await new todoModel(ToDo).save();
        console.log(result);
    }

    async getAll(): Promise<ToDoResponseModel[]> {
        const result = await todoModel.find()
        return result.map(item => ({
            _id: item.id,
            name: item.name,
            description: item.description
        }));
    }

    async getOne(id: String): Promise<ToDoResponseModel | null> {
        const result = await todoModel.findById(id);
        if (result) {
          return {
            _id: result.id,
            name: result.name,
            description: result.description,
          };
        } else {
          return null;
        }
    }
}