import { ToDoResponseModel } from "../../models/todo";
import { ToDoRepository } from "../../interfaces/repositories/todo-repository";
import { GetAllToDoUseCase } from "../../interfaces/use-cases/get-all-todos-use-case";

export class GetAllToDos implements GetAllToDoUseCase {
    ToDoRepository: ToDoRepository
    constructor(ToDoRepository: ToDoRepository) {
        this.ToDoRepository = ToDoRepository
    }

    async execute(): Promise<ToDoResponseModel[]> {
        const result = await this.ToDoRepository.getToDos()
        return result
    }
}