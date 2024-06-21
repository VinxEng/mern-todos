import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import router from "./routes/todo.routes.js";

const app = express();
// const corsOptions = {
// 	origin: "http://localhost:5173", //*
// 	methods: ["GET", "POST", "PUT", "DELETE"],
// 	allowedHeaders: ["Content-Type", "Authorization"],
// 	credentials: true,
// };

// Middleware
app.use(express.json());
// app.use(cors(corsOptions));
app.use(cors());
app.use("/api", router);

const port = process.env.PORT || 5000;
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		app.listen(port, () => {
			console.log(`Server is listening on http://localhost:${port}`);
		});
	})
	.catch((err) => console.log(`Unable to get database collection: ${err}`));
