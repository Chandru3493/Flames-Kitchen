import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import CreateTask from "./CreateTask.jsx";
import ListTasks from "./ListTasks.jsx";

export default function Cook(props) {
	const [tasks, setTasks] = useState([]);

	// console.log("tasks", tasks);

	useEffect(() => {
		// setTasks(JSON.parse(localStorage.getItem("tasks")));
	}, []);
	return (
		<DndProvider backend={HTML5Backend}>
			{/* <Sidebar /> */}
			<div className="flex justify-center items-center mt-14">
				<p className=" w-100 max-w-md font-bold text-lg text-center flex flex-row items-center border border-gray-400 border-solid  rounded-lg p-4">
					Cook's Area
					<img className="h-40 w-60 ml-4" src="./chef.svg" />
				</p>
			</div>

			<Toaster />
			<div className="bg-slate-100 w-screen h-screen flex flex-col items-center p-3 gap-16 pt-10">
				<CreateTask tasks={tasks} setTasks={setTasks} />
				<ListTasks user={props.d} tasks={tasks} setTasks={setTasks} />
				<button className="bg-green-500 rounded-md px-4 h-12 text-white">
					Generate Bill =
				</button>
			</div>
		</DndProvider>
	);
}
