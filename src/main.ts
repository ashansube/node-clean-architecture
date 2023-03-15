import server from './server';
import ToDoRouter from './application/routers/todo-router';
import { GetAllToDos } from './domain/use-cases/todo/get-all-todos';
import { ToDoRepositoryImpl } from './domain/repositories/todo-repository';
import { CreateToDo } from './domain/use-cases/todo/create-todo';
import { MongoDBToDoDataSource } from './data/data-sources/mongodb/mongodb-todo-data-source';
import mongoose from 'mongoose';
import { DeleteToDo } from './domain/use-cases/todo/delete-todo';
import { UpdateToDo } from './domain/use-cases/todo/update-todo';
import { GetOneToDo } from './domain/use-cases/todo/get-one-todo';
const amqp = require("amqplib");

mongoose.set('strictQuery', false);

async function connect() {
    const msgBuffer = Buffer.from(JSON.stringify({ number: 10 }));
    try {
      const connection = await amqp.connect("amqp://localhost:5672");
      const channel = await connection.createChannel();
      await channel.assertQueue("number");
      await channel.sendToQueue("number", msgBuffer);
      console.log("Sending message to number queue");
      await channel.close();
      await connection.close();
    } catch (ex) {
      console.error(ex);
    }
}

async function getMongoDS() {
    await mongoose.connect('mongodb://localhost:27017/clean-todo');
    const connection = mongoose.connection;

    connection.once("open", function() {
        console.log("MongoDB database connection established successfully ⚡");
    });

    return new MongoDBToDoDataSource();
}

(async () => {

    connect();
    const dataSource = await getMongoDS();

    const ToDoMiddleWare = ToDoRouter(
        new GetAllToDos(new ToDoRepositoryImpl(dataSource)),
        new CreateToDo(new ToDoRepositoryImpl(dataSource)),
        new DeleteToDo(new ToDoRepositoryImpl(dataSource)),
        new UpdateToDo(new ToDoRepositoryImpl(dataSource)),
        new GetOneToDo(new ToDoRepositoryImpl(dataSource))
    )

    server.use("/todo", ToDoMiddleWare)
    server.listen(5000, () => console.log("Running on http://localhost:5000"))

})()