import { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const CreateTask = ({ tasks, setTasks }) => {
	const [task, setTask] = useState({
		id: "",
		name: "",
		status: "todo", //can also be inprogress or closed
	});

	// console.log(task);
	const handleSubmit = (e) => {
		e.preventDefault();

		setTask({
			id: "",
			name: "",
			status: "todo", //can also be inprogress or closed
		});
		if (task.name.length < 3)
			return toast.error("Task should be greater than 3 characters.");
		setTasks((prev) => {
			prev = prev || [];
			const list = [...prev, task];

			localStorage.setItem("tasks", JSON.stringify(list));

			return list;
		});

		toast.success("Task created");
	};
	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-1"
				value={task.name}
				onChange={(e) => {
					setTask({
						...task,
						id: uuidv4(),
						name: e.target.value,
					});
				}}
				list="menu"
			/>

			<datalist id="menu">
				<option value="Fried Rice" />
				<option value="Noodles" />
				<option value="Momos" />
				<option value="Paneer Tikka" />
				<option value="Butter Chicken" />
				<option value="Naan" />
				<option value="Chicken Biryani" />
				<option value="Chole Bhature" />
				<option value="Rajma Chawal" />
				<option value="Aloo Paratha" />
				<option value="Samosa" />
				<option value="Dosa" />
				<option value="Idli Sambhar" />
				<option value="Pav Bhaji" />
				<option value="Vada Pav" />
				<option value="Matar Paneer" />
				<option value="Chicken Curry" />
				<option value="Rasgulla" />
				<option value="Gulab Jamun" />
				<option value="Rasmalai" />
			</datalist>
			<button className="bg-cyan-500 rounded-md px-4 h-12 text-white">
				Create
			</button>
		</form>
	);
};

export default CreateTask;
