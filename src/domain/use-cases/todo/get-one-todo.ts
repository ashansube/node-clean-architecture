import { ToDoResponseModel } from "../../models/todo";
import { ToDoRepository } from "../../interfaces/repositories/todo-repository";
import { GetOneToDoUseCase } from "../../interfaces/use-cases/get-one-todo-use-case";

export class GetOneToDo implements GetOneToDoUseCase {
    ToDoRepository: ToDoRepository
    constructor(ToDoRepository: ToDoRepository) {
        this.ToDoRepository = ToDoRepository
    }

    async execute(id: String): Promise<ToDoResponseModel | null> {
        const result = await this.ToDoRepository.getToDo(id)
        return result
    }
}