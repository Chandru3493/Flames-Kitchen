import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import toast from "react-hot-toast";
import axios from "axios";
// import socketIOClient from 'socket.io-client';

const ListTasks = ({ tasks, setTasks,user }) => {
	const [todos, setTodos] = useState([]);
	const [inProgress, setInProgress] = useState([]);
	const [closed, setClosed] = useState([]);
	
	useEffect(() => {
	// 	const sock = socketIOClient('http://localhost:4000');
	// sock.on('update', () => {
	// 	console.log('this is socket');
	// 	fetchTasks();
	//   });
		fetchTasks();
	}, []);

	

	const fetchTasks = async () => {
		try {
			
			const response = await axios.get("http://localhost:4000/orderItems");
			const fetchedTasks = response.data;
			// console.log("Response: ", response.data);
			const ftodos = fetchedTasks.filter((task) => task.status === "todo");
			console.log("Ftodos: ", ftodos);
			console.log("Response: ", response.data);
			const fInProgress = fetchedTasks.filter(
				(task) => (task.status === "inprogress" && task.cook_id===user.id)
			);
			console.log("FinProgress: ", fInProgress);
			const fClosed = fetchedTasks.filter((task) => task.status === "closed");
			console.log("FClosed: ", fClosed);

			setTodos(ftodos);
			setInProgress(fInProgress);
			setClosed(fClosed);
		} catch (error) {
			console.error("Error fetching tasks:", error);
		}
	};

	return (
		<>
			<div className="flex gap-16">
				{["todo", "inprogress", "closed"].map((status, index) => (
					<Section
					    use = {user}
						key={index}
						status={status}
						tasks={tasks}
						setTasks={setTasks}
						todos={todos}
						inProgress={inProgress}
						closed={closed}
						fetchTasks={fetchTasks}
					/>
				))}
			</div>
		</>
	);
};

const Section = ({
	use,
	status,
	tasks,
	setTasks,
	todos,
	inProgress,
	closed,
	fetchTasks,
}) => {
	const [{ isOver }, drop] = useDrop(() => ({
		accept: "task",
		drop: (item) => addItemToSection(item.id),
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
		}),
	}));

	let text = status.charAt(0).toUpperCase() + status.slice(1);
	let bg = "";

	switch (status) {
		case "todo":
			bg = "bg-slate-500";
			break;
		case "inprogress":
			bg = "bg-purple-500";
			break;
		case "closed":
			bg = "bg-green-500";
			break;
		default:
			bg = "bg-slate-500";
			break;
	}

	let tasksToMap = [];
	switch (status) {
		case "todo":
			tasksToMap = todos;
			break;
		case "inprogress":
			tasksToMap = inProgress;
			break;
		case "closed":
			tasksToMap = closed;
			break;
		default:
			tasksToMap = [];
			break;
	}

	const addItemToSection = async (id) => {
		const cookid=use.id;
		try {
			const response = await axios.put(
				`http://localhost:4000/orderItems/${id}`,
				{ status,cookid }
			);
			if (response.status === 200) {
				toast("Task status changed successfully.", { icon: "😲" });
				fetchTasks(); // Refresh tasks after status change
			}
		} catch (error) {
			console.error("Error updating task status:", error);
		}
	};

	return (
		<div
			ref={drop}
			className={`w-64 rounded-md p-2 ${isOver ? "bg-slate-200" : ""}`}
		>
			<Header text={text} bg={bg} count={tasksToMap.length} />
			{tasksToMap.map((task) => {
				{
					/* console.log("Task: ", task.menuitem.name); // Print task.id to the console */
				}
				return (
					<div key={task.id}>
						<Task
							task={task}
							tasks={tasks}
							setTasks={setTasks}
							addItemToSection={addItemToSection}
							fetchTasks={fetchTasks}
						/>
					</div>
				);
			})}
		</div>
	);
};

const Header = ({ text, bg, count }) => {
	return (
		<div
			className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-white text-sm`}
		>
			{text}
			<div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
				{count}
			</div>
		</div>
	);
};

const Task = ({ task, tasks, setTasks, addItemToSection, fetchTasks }) => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: "task",
		item: { id: task.id },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));

	const [showDetails, setShowDetails] = useState(false);

	const handleToggleDetails = () => {
		setShowDetails(!showDetails);
	};

	const handleRemove = async (id) => {
		try {
			const response = await axios.delete(
				`http://localhost:4000/orderItems/${id}`
			);
			console.log("Id: ", id);
			if (response.status === 200) {
				toast("Task removed", { icon: "💀" });
				// Refresh tasks after deletion
				fetchTasks();
			}
		} catch (error) {
			console.error("Error removing task:", error);
		}
	};

	return (
		<div
			ref={drag}
			className={`relative p-4 mt-8 shadow-md ${
				isDragging ? "opacity-25" : "opacity-100"
			} rounded-md cursor-grab`}
		>
			<p>{task.menuitem.name}</p>
			<button
				className="absolute bottom-1 right-8 w-5 h-6"
				onClick={handleToggleDetails}
			>
				<img src="information.png" alt="" />
			</button>
			{showDetails && (
				<div className="modal">
					<div className="modal-content">
						<span className="close" onClick={handleToggleDetails}>
							&times;
						</span>
						<h2>Task Details</h2>
						<p>Table ID: {task.tableId}</p>
						<p>Waiter ID: {task.waiterId}</p>
						<p>Cook ID: {task.cook_id}</p>
						<p>Quantity: {task.quantity}</p>
						<p>Description: {task.menuitem.description}</p>
					</div>
				</div>
			)}
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

// const Task = ({ task, tasks, setTasks, addItemToSection, fetchTasks }) => {
// 	const [{ isDragging }, drag] = useDrag(() => ({
// 		type: "task",
// 		item: { id: task.id },
// 		collect: (monitor) => ({
// 			isDragging: !!monitor.isDragging(),
// 		}),
// 	}));

// 	const handleRemove = async (id) => {
// 		try {
// 			const response = await axios.delete(
// 				`http://localhost:4000/orderItems/${id}`
// 			);
// 			console.log("Id: ", id);
// 			if (response.status === 200) {
// 				toast("Task removed", { icon: "💀" });
// 				// Refresh tasks after deletion
// 				fetchTasks();
// 			}
// 		} catch (error) {
// 			console.error("Error removing task:", error);
// 		}
// 	};

// 	return (
// 		<div
// 			ref={drag}
// 			className={`relative p-4 mt-8 shadow-md ${
// 				isDragging ? "opacity-25" : "opacity-100"
// 			} rounded-md cursor-grab`}
// 		>
// 			<p>{task.menuitem.name}</p>
// 			<button className="absolute bottom-1 right-8 w-5 h-6">
// 				<img src="information.png" alt="" />
// 			</button>
// 			<button
// 				className="absolute bottom-1 right-1 text-slate-400"
// 				onClick={() => handleRemove(task.id)}
// 			>
// 				<svg
// 					xmlns="http://www.w3.org/2000/svg"
// 					fill="none"
// 					viewBox="0 0 24 24"
// 					strokeWidth={1.5}
// 					stroke="currentColor"
// 					className="w-6 h-6"
// 				>
// 					<path
// 						strokeLinecap="round"
// 						strokeLinejoin="round"
// 						d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
// 					/>
// 				</svg>
// 			</button>
// 		</div>
// 	);
// };

export default ListTasks;
