import dotenv from "dotenv";
dotenv.config();
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/";

const opt = {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationError: true,
	},
};

let client;
export default async function connectToMongoDB() {
	if (!client) {
		try {
			client = await MongoClient.connect(uri, opt);
			console.log("Connected to MongoDB");

			// Access your database here (optional)
			// const db = client.db(dbName);
			// const collection = db.collection("todos");
			// await client.close();
		} catch (error) {
			console.log("Error connecting to MongoDB:", error);
		} finally {
			// console.log("MongoDB connection is closing ~~~~");
			// client.close();
		}
	}
	return client;
}

export function getConnectedClient() {
	if (!client) {
		console.log("Client is not connected to MongoDB");
	}
	return client;
}

// export default { connectToMongoDB, getConnectedClient };
// export default connectToMongoDB;
