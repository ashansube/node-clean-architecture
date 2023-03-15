import express from "express";
import { Request, Response } from 'express';
import { CreateToDoUseCase } from '../../domain/interfaces/use-cases/create-todo-use-case';
import { DeleteToDoUseCase } from "../../domain/interfaces/use-cases/delete-todo-use-case";
import { GetAllToDoUseCase } from '../../domain/interfaces/use-cases/get-all-todos-use-case';
import { GetOneToDoUseCase } from "../../domain/interfaces/use-cases/get-one-todo-use-case";
import { UpdateToDoUseCase } from "../../domain/interfaces/use-cases/update-todo-use-case";

export default function ToDoRouter(
    getAllToDoUseCase: GetAllToDoUseCase,
    createToDoUseCase: CreateToDoUseCase,
    deleteToDoUseCase: DeleteToDoUseCase,
    updateToDoUseCase: UpdateToDoUseCase,
    getOneToDoUseCase: GetOneToDoUseCase
) {
    const router = express.Router()

    router.get('/', async (req: Request, res: Response) => {
        try {
            const ToDos = await getAllToDoUseCase.execute()
            res.send(ToDos)
        } catch (err) {
            res.status(500).send({ message: "Error fetching data" })
        }
    })

    router.post('/', async (req: Request, res: Response) => {
        try {
            await createToDoUseCase.execute(req.body)
            res.status(201)
            res.json({ message: "ToDo Created Successfully 🧾" })
        } catch (err) {
            res.status(500).send({ message: "Error saving data" })
        }
    })

    router.delete('/:id', async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            await deleteToDoUseCase.execute(id);
            res.status(201)
            res.json({ message: "ToDo Deleted Successfully" })
        }catch (err) {
            res.status(500).send({ message: "Error while deleting ToDo" })
        }
    })

    router.patch('/:id', async (req: Request, res: Response) => {
        const id = req.params.id;
        const data = req.body;
        try {
            await updateToDoUseCase.execute(id, data);
            res.status(201).json({ message: "ToDo Updated successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "An error occurred while updating the ToDo" });
        }
    })

    router.get('/:id', async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const todo = await getOneToDoUseCase.execute(id);
            res.status(200).json(todo);
        } catch (err) {
            res.status(500).json({ message: 'Error getting todo' });
        }
    });

    return router
}