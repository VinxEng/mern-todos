import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
app.use(express.json());

import router from "./routes.js";
import connectToMongoDB from "./database.js";

app.use("/api", router);

const port = process.env.PORT || 5000;

/**
 * Khởi chạy Server
 */
async function startServer() {
	try {
		await connectToMongoDB();
		app.listen(port, () => {
			console.log(`Server is listening on http://localhost:${port}`);
		});
	} catch (e) {
		console.error(`Index.js ~~~ Unable to get database.collection: ${e}`);
	}

	// await connectToMongoDB();
	// app.listen(port, () => {
	// 	console.log(`Server is listening on http://localhost:${port}`);
	// });
}
startServer();
