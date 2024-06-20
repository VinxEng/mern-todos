import { useEffect, useState } from "react";
import Todo from "./Todo";

export default function App() {
	const [todos, setTodos] = useState([]);
	const [content, setContent] = useState("");
	const [error, setError] = useState(null);

	useEffect(() => {
		async function getTodos() {
			const res = await fetch("/api/todos");

			// if (!res.ok) {
			// 	throw new Error("Network response was not ok");
			// }
			const todos = await res.json();
			setTodos(todos);
		}
		getTodos();
	}, []);

	// useEffect(() => {
	// 	async function getTodos() {
	// 		try {
	// 			const res = await fetch("/api/todos");
	// 			// console.log(res);
	// 			const data = await res.text(); // Fetch response as text
	// 			// console.log(data);
	// 			const data2 = await res.json();
	// 			console.log(data2);
	// 			// Check if the response is valid JSON before parsing
	// 			if (res.headers.get("Content-Type")?.includes("application/json")) {
	// 				const parsedData = JSON.parse(data);
	// 				setTodos(parsedData.msg); // Assuming "msg" is the key for todos
	// 				console.log(parsedData.msg);
	// 			} else {
	// 				setError(
	// 					"Đã nhận được định dạng phản hồi không mong đợi. Vui lòng kiểm tra máy chủ."
	// 				);
	// 			}
	// 		} catch (error) {
	// 			setError(error);
	// 		}

	// 		// const res = await fetch("/api/todos");
	// 		// const data = await res.json();
	// 		// console.log(data.msg);
	// 	}
	// 	getTodos();
	// }, []);

	const createNewTodo = async (e) => {
		e.preventDefault();
		if (content.length > 3) {
			const res = await fetch("/api/todos", {
				method: "POST",
				body: JSON.stringify({ title: content }),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const newTodo = await res.json();

			setContent("");
			setTodos([...todos, newTodo]);
		}
	};

	return (
		<main className="container">
			<h1 className="title">Awesome Todos</h1>
			<form className="form" onSubmit={createNewTodo}>
				<input
					type="text"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					placeholder="Enter a new todo..."
					className="form__input"
					required
				/>
				<button className="form__button" type="submit">
					Create Todo
				</button>
			</form>
			{/* {error !== null ? (
				<div className="todos">{error}</div>
			) : (
				<div className="todos">
					{todos.length > 0 &&
						todos.map((todo) => (
							<Todo key={todo._id} todo={todo} setTodos={setTodos} />
						))}
				</div>
			)} */}

			<div className="todos">
				{todos.length > 0 &&
					todos.map((todo) => (
						<Todo key={todo._id} todo={todo} setTodos={setTodos} />
					))}
			</div>
		</main>
	);
}
