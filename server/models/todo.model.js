import mongoose from "mongoose";

// Thiết lập kết nối tới MongoDB
// mongoose.connect(`${process.env.MONGODB_URI}/mern_todos`);

const toDoSchema = new mongoose.Schema({
	toDo: {
		type: String,
		required: true,
	},
});

export default mongoose.model("ToDo", toDoSchema);
