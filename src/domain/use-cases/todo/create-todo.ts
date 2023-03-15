import { ToDoRequestModel } from "../../models/todo";
import { ToDoRepository } from "../../interfaces/repositories/todo-repository";
import { CreateToDoUseCase } from "../../interfaces/use-cases/create-todo-use-case";

export class CreateToDo implements CreateToDoUseCase {
    ToDoRepository: ToDoRepository
    constructor(ToDoRepository: ToDoRepository) {
        this.ToDoRepository = ToDoRepository
    }

    async execute(ToDo: ToDoRequestModel) {
        await this.ToDoRepository.createToDo(ToDo)
    }
}