import mongoose from 'mongoose';

const ToDoSchema = new mongoose.Schema(
	{
		_id: { type: String},
		name: { type: String, required: true },
        description: { type: String, required: true}
	}
)

const todoModel = mongoose.model('ToDo', ToDoSchema)
export default todoModel