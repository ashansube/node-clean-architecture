import { ToDoRepository } from "../../interfaces/repositories/todo-repository";
import { DeleteToDoUseCase } from "../../interfaces/use-cases/delete-todo-use-case";

export class DeleteToDo implements DeleteToDoUseCase {
    ToDoRepository: ToDoRepository
    constructor(ToDoRepository: ToDoRepository) {
        this.ToDoRepository = ToDoRepository
    }

    async execute(id: String) {
        await this.ToDoRepository.deleteToDo(id)
    }
}