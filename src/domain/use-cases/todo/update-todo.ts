import { ToDoRepository } from "../../interfaces/repositories/todo-repository";
import { UpdateToDoUseCase } from "../../interfaces/use-cases/update-todo-use-case";
import { ToDoRequestModel, ToDoResponseModel } from "../../models/todo";

export class UpdateToDo implements UpdateToDoUseCase {
    ToDoRepository: ToDoRepository
    constructor(ToDoRepository: ToDoRepository) {
        this.ToDoRepository = ToDoRepository
    }

    async execute(id: String, data: ToDoRequestModel): Promise<ToDoResponseModel | null> {
        const updatedTodo = await this.ToDoRepository.updateToDo(id, data)
        return updatedTodo
    }
}