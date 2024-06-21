import express from "express";
import {
	delTodos,
	getToDos,
	postTodos,
	putTodos,
} from "../controller/todo.controler.js";
const router = express.Router();

router.get("/todos", getToDos);
router.post("/todos", postTodos);
router.put("/todos/:id", putTodos);
router.delete("/todos/:id", delTodos);

export default router;
