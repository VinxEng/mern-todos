import express from "express";
const router = express.Router();

import { getConnectedClient } from "./database.js";
import { ObjectId } from "mongodb";
const getCollection = () => {
	const client = getConnectedClient();
	const collection = client.db("mern_todos").collection("todos");
	return collection;
};

// GET /todos
router.get("/todos", async (req, res) => {
	try {
		// 1. Retrieve the collection (assuming `getCollection` returns a Promise)
		const collection = await getCollection();

		// 2. Find all todos
		const todos = await collection.find({}).toArray(); // Use toArray()
		// console.table(todos);

		// 3. Send successful response with todos
		res.status(200).json(todos);
	} catch (error) {
		// 4. Handle errors gracefully
		console.error("Lỗi khi tìm nạp thông tin:", error);
		res.status(500).json({ message: "Lỗi truy xuất Todos" });
	}
});

// POST /todos
router.post("/todos", async (req, res) => {
	try {
		// 1. Retrieve the collection (assuming `getCollection` returns a Promise)
		const collection = await getCollection();

		// 2. Validate incoming data (optional)
		const { title, description } = req.body; // Assuming your request body has these fields
		if (!title || !description) {
			return res
				.status(400)
				.json({ message: "Missing required fields (title, description)" });
		}

		// 3. Create a new todo object
		const newTodo = { title, description, completed: false }; // Set completed to false by default

		// 4. Insert the new todo into the collection
		const result = await collection.insertOne(newTodo);
		// console.log(result);
		// 5. Send successful response with the newly created todo
		res.status(201).json(result); // Send the first inserted document (the new todo)
		console.log("Tạo thành công Todo:", result.insertedId);
	} catch (error) {
		// 6. Handle errors gracefully
		console.error("Lỗi khi tạo Todo:", error);
		res.status(500).json({ message: "Lỗi khi tạo Todo" });
	}
});

// DELETE /todos/:id
router.delete("/todos/:id", async (req, res) => {
	try {
		// 1. Retrieve the collection (assuming `getCollection` returns a Promise)
		const collection = await getCollection();

		// 2. Extract ID from request params
		const obj = new ObjectId(req.params);

		// 3. Validate ID format (optional)
		if (!obj) {
			// Assuming a function to check valid object ID format
			return res.status(400).json({ message: "Todo ID không hợp lệ." });
		}

		// 4. Delete the todo with the specified ID
		const deleteResult = await collection.deleteOne({ _id: obj });
		// console.log(deleteResult);

		// 5. Handle successful deletion
		if (deleteResult.deletedCount === 1) {
			res.status(200).json({ message: "Xóa thành công Todo" });
		} else {
			res.status(404).json({ message: "Không tìm thấy Todo" });
		}
	} catch (error) {
		// 6. Handle errors gracefully
		console.error("Lỗi khi thực hiện xóa Todo:", error);
		res.status(500).json({ message: "Lỗi khi thực hiện xóa Todo" });
	}
});

// PUT /todos/:id
router.put("/todos/:id", async (req, res) => {
	try {
		// 1. Retrieve the collection (assuming `getCollection` returns a Promise)
		const collection = await getCollection();

		// 2. Extract ID from request params
		// const id = req.params;
		// console.log(id);
		const obj = new ObjectId(req.params);
		// console.log(oid);

		// 3. Validate ID format (optional)
		if (!obj) {
			// Assuming a function to check valid object ID format
			return res.status(400).json({ message: "Todo ID không hợp lệ." });
		}

		// 4. Get the data to update (optional)
		const { title, description, completed } = req.body; // Assuming these fields are sent for update

		// 5. Construct the update document
		const updateDoc = { $set: {} }; // Use $set modifier for partial updates
		if (title) updateDoc.$set.title = title;
		if (description) updateDoc.$set.description = description;
		if (completed !== undefined) updateDoc.$set.completed = completed; // Update completed only if provided

		// 6. Update the todo with the specified ID
		const updateResult = await collection.updateOne({ _id: obj }, updateDoc);

		// 7. Handle successful update
		if (updateResult.modifiedCount === 1) {
			res.status(200).json({ message: "Cập nhật thành công Todo." });
		} else {
			res.status(404).json({ message: "Không tìm thấy Todo" });
		}
	} catch (error) {
		// 8. Handle errors gracefully
		console.error("Lỗi cập nhật Todo:", error);
		res.status(500).json({ message: "Lỗi cập nhật Todo" });
	}
});

export default router;
