import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import toast from "react-hot-toast";
import axios from "axios";
// import "./tail.css";
// import socketIOClient from 'socket.io-client';

const ListTasks = ({ tasks, setTasks, user,d }) => {
	if (d && d ? d : true) {
		import('./tail.css');
	 }
	const [todos, setTodos] = useState([]);
	const [inProgress, setInProgress] = useState([]);
	const [closed, setClosed] = useState([]);

	useEffect(() => {
		fetchTasks();
	}, []);

	useEffect(() => {
		updateOrderPrep();
	}, [todos, inProgress, closed]);

	const fetchTasks = async () => {
		try {
			const response = await axios.get("http://localhost:4000/orderItems");
			const fetchedTasks = response.data;
			// console.log("Response: ", response.data);
			const ftodos = fetchedTasks.filter((task) => task.status === "todo");
			console.log("Ftodos: ", ftodos);
			console.log("Response: ", response.data);
			const fInProgress = fetchedTasks.filter(
				(task) => task.status === "inprogress"
			);
			console.log("FinProgress: ", fInProgress);
			const fClosed = fetchedTasks.filter((task) => task.status === "closed");
			console.log("FClosed: ", fClosed);

			setTodos(ftodos);
			setInProgress(fInProgress);
			setClosed(fClosed);

			// updateOrderPrep(user.id);
		} catch (error) {
			console.error("Error fetching tasks:", error);
		}
		// updateOrderPrep();
	};
	const updateOrderPrep = async (orderItemId) => {
		try {
			if (orderItemId) {
				// Check if orderItemId is defined
				console.log("order id : ", orderItemId);
				const response = await axios.get(
					`http://localhost:4000/orderItems/count`,
					{ params: { orderItemId } }
				);

				const todoCount = response.data.count;
				console.log("count from listask :", todoCount);

				await axios.put(`http://localhost:4000/orders/${orderItemId}`, {
					orderItemId,
					todoCount,
				});

				// Optionally, you can fetch and update the tasks to reflect the changes
				fetchTasks();
			} else {
				console.log("orderItemId is undefined");
			}
		} catch (error) {
			console.error("Error updating order_prep:", error);
		}
	};

	return (
		<>
			<div className="flex gap-16">
				{["todo", "inprogress", "closed"].map((status, index) => (
					<Section
						use={user}
						key={index}
						status={status}
						tasks={tasks}
						setTasks={setTasks}
						todos={todos}
						inProgress={inProgress}
						closed={closed}
						fetchTasks={fetchTasks}
						updateOrderPrep={updateOrderPrep}
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
	updateOrderPrep,
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
			text = "Ordered";
			break;
		case "inprogress":
			bg = "bg-purple-500";
			text = "Preparing";
			break;
		case "closed":
			bg = "bg-green-500";
			text = "Completed";
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
		const cookid = use.id;
		console.log("Cook Id :", cookid);
		try {
			const response = await axios.put(
				`http://localhost:4000/orderItems/${id}`,
				{ status, cookid }
			);
			if (response.status === 200) {
				toast("Task status changed successfully.", { icon: "😲" });
				fetchTasks(); // Refresh tasks after status change
				updateOrderPrep(id);
			}
		} catch (error) {
			console.error("Error updating task status:", error);
		}
	};

	return (
		<div>
			<Header text={text} bg={bg} count={tasksToMap.length} />
			<div
				ref={drop}
				className={`w-64 rounded-md p-1 m-12 mt-2 overflow-y-auto h-72 scrollbar-w-2  ${
					isOver ? "bg-slate-200" : ""
				}`}
				style={{
					scrollbarWidth: "thin", // For Firefox
					scrollbarColor: "#4A5568 #CBD5E0", // For Firefox
					msOverflowStyle: "none",
				}}
			>
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
		</div>
	);
};

const Header = ({ text, bg, count }) => {
	return (
		<div
			className={`${bg} flex items-center h-14 ml-4 mr-4  rounded-md uppercase text-white text-md justify-center `}
		>
			{text}
			<div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
				{count}
			</div>
		</div>
	);
};

const Task = ({ task, tasks, setTasks, addItemToSection, fetchTasks }) => {
	console.log(task);
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
			className={` relative p-4 mt-3  shadow-md ${
				isDragging ? "opacity-25" : "opacity-100"
			} rounded-md cursor-grab`}
		>
			<p>{task.menuitem.name}</p>
			<button
				className="absolute bottom-1 right-8 w-5 h-6 "
				onClick={handleToggleDetails}
			>
				<img src="information.png" alt="" />
			</button>

			{showDetails && (
				<div className="fixed inset-0 overflow-y-auto flex justify-center items-center z-50">
					<div className="fixed inset-0 transition-opacity">
						<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
					</div>
					<div className="bg-white rounded-lg p-8 z-50 max-w-md">
						<div className="text-right">
							<button
								className="text-gray-400 hover:text-gray-600 focus:outline-none"
								onClick={handleToggleDetails}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>
						<div className="mt-4">
							<h2 className="text-xl font-bold mb-4">Task Details</h2>
							<p className="mb-2">Table ID: {task.order.table_id}</p>
							<p className="mb-2">Waiter ID: {task.order.waiter_id}</p>
							<p className="mb-2">Cook ID: {task.cook_id}</p>
							<p className="mb-2">Quantity: {task.quantity}</p>
							<p>Description: {task.menuitem.description}</p>
						</div>
					</div>
				</div>
			)}
			<button className="absolute bottom-1 right-1 text-white border border-gray-800 rounded-full bg-black p-2 w-6 h-6 flex items-center justify-center">
				{task.cook_id}
			</button>
		</div>
	);
};

export default ListTasks;
