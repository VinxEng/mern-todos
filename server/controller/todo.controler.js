import todoModel from "../models/todo.model.js";
import "dotenv/config";

export async function getToDos(req, res) {
	const toDos = await todoModel.find();
	res.send(toDos);
}

export async function postTodos(req, res) {
	const { toDo } = req.body;
	todoModel
		.create({ toDo })
		.then((data) => {
			console.log("Saved Successfully...");
			res.status(201).send(data);
		})
		.catch((err) => {
			console.log(err);
			res.send({ error: err, msg: "Something went wrong!" });
		});
}

export async function delTodos(req, res) {
	const { id } = req.params;
	console.log(id);
	todoModel
		.findByIdAndDelete(id)
		.then(() => {
			res.send("Deleted Successfully....");
		})
		.catch((err) => {
			console.log(err);
			res.send({ error: err, msg: "Something went wrong!" });
		});
}

export async function putTodos(req, res) {
	const { id } = req.params;
	const { toDo } = req.body;

	todoModel
		.findByIdAndUpdate(id, { toDo })
		.then(() => {
			res.send("Updated Successfully....");
		})
		.catch((err) => {
			console.log(err);
			res.send({ error: err, msg: "Something went wrong!" });
		});
}
