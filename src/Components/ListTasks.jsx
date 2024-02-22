import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import toast from "react-hot-toast";

const ListTasks = ({ tasks, setTasks }) => {
	const [todos, setTodos] = useState([]);
	const [inProgress, setInProgress] = useState([]);
	const [closed, setClosed] = useState([]);

	// tasks.forEach((task) => {
	// 	console.log(`Key: ${task.name}, Value: ${task.status}`);
	// });

	useEffect(() => {
		const ftodos = tasks ? tasks.filter((task) => task.status === "todo") : [];
		// console.log("Effect", ftodos);
		const fInProgress = tasks
			? tasks.filter((task) => task.status === "inprogress")
			: [];

		const fClosed = tasks
			? tasks.filter((task) => task.status === "closed")
			: [];

		setTodos(ftodos);
		setInProgress(fInProgress);
		setClosed(fClosed);
	}, [tasks]);

	const statuses = ["todo", "inprogress", "closed"];
	return (
		<>
			<div className="flex gap-16">
				{statuses.map((status, index) => (
					<Section
						key={index}
						status={status}
						tasks={tasks}
						setTasks={setTasks}
						todos={todos}
						inProgress={inProgress}
						closed={closed}
					/>
				))}
			</div>
		</>
	);
};

export default ListTasks;

//We can create new components in the same file.

export let price = 0;
let fClosed = [];

const Section = ({ status, tasks, setTasks, todos, inProgress, closed }) => {
	// <h2>{status}</h2>;

	const [{ isOver }, drop] = useDrop(() => ({
		accept: "task",
		drop: (item) => addItemToSection(item.id),
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
		}),
	}));
	let text = "todo";
	let bg = "bg-slate-500";
	let tasksToMap = todos;
	// console.log(`${tasksToMap.name}`);

	// console.log(inProgress.length);

	if (status === "inprogress") {
		text = "In Progress";
		bg = "bg-purple-500";
		tasksToMap = inProgress;
	}

	if (status === "closed") {
		text = "Closed";
		bg = "bg-green-500";
		tasksToMap = closed;
		if (tasks) {
			fClosed = tasks.filter((task) => task.status === "closed");
		} else {
			fClosed = [];
		}
	}

	const addItemToSection = (id) => {
		// console.log("Dropped", id, status);
		setTasks((prev) => {
			prev = prev || [];
			const mTasks = prev.map((t) => {
				if (t.id === id) {
					return { ...t, status: status };
				}
				return t;
			});
			localStorage.setItem("tasks", JSON.stringify(mTasks));

			toast("Task status changed successfully .", { icon: "😲" });
			return mTasks;
		});
	};

	return (
		<div
			ref={drop}
			className={`w-64 rounded-md p-2 ${isOver ? "bg-slate-200" : ""}`}
		>
			<Header text={text} bg={bg} count={tasksToMap.length} />
			{tasksToMap.length > 0 &&
				tasksToMap.map((task) => (
					<Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
				))}
			{price};
		</div>
	);
};

fetch("menu.json")
	.then((response) => {
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		return response.json();
	})
	.then((jsonData) => {
		const menu = jsonData.menu;
		fClosed.forEach((d) => {
			menu.forEach((dish) => {
				if (d.name === dish.name) {
					console.log("Dish", d.name);
					price = price + dish.price;
				}
			});
		});
		console.log("Price", price);
	})
	.catch((error) => {
		console.error("There was a problem fetching the menu data:", error);
	});

const Header = ({ text, bg, count }) => {
	return (
		<div
			className={`${bg}	flex items-center h-12 pl-4 rounded-md uppercase text-white text-sm`}
		>
			{text}
			<div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
				{count}
			</div>
		</div>
	);
};
const Task = ({ task, tasks, setTasks }) => {
	// console.log("tasks, ", task);

	const [{ isDragging }, drag] = useDrag(() => ({
		type: "task",
		item: { id: task.id },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));

	// console.log(isDragging);
	const handleRemove = (id) => {
		// console.log(id);
		const fTasks = tasks.filter((t) => t.id !== id);

		localStorage.setItem("tasks", JSON.stringify(fTasks));

		setTasks(fTasks);

		toast("Task removed", { icon: "💀" });
	};
	return (
		<div
			ref={drag}
			className={`relative p-4 mt-8 shadow-md ${
				isDragging ? "opacity-25" : "opacity-100"
			} rounded-md cursor-grab`}
		>
			<p>{task.name}</p>
			<button
				className="absolute bottom-1 right-1 text-slate-400"
				onClick={() => handleRemove(task.id)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
					/>
				</svg>
			</button>
		</div>
	);
};
