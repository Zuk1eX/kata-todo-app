import { useState } from "react";
import "./App.css";
import { NewTaskForm } from "./components/NewTaskForm/NewTaskForm";
import { TaskList } from "./components/TaskList/TaskList";
import { Footer } from "./components/Footer/Footer";
import { TasksFilter } from "./components/TasksFilter/TasksFilter";
import tasksData from "./tasks";
import { Header } from "./components/Header/Header";

function App() {
	const [tasks, setTasks] = useState(tasksData);
	const [filter, setFilter] = useState("all");

	function createTask(title) {
		const newTask = {
			id: Date.now(),
			title,
			completed: false,
			created: new Date(),
		};
		setTasks([...tasks, newTask]);
	}

	function deleteTask(id) {
		setTasks(tasks.filter((task) => task.id !== id));
	}

	function toggleTask(id) {
		setTasks(
			tasks.map((task) => {
				if (task.id === id) {
					return {
						...task,
						completed: !task.completed,
					};
				}
				return task;
			})
		);
	}

	function updateTask(id, title) {
		setTasks(
			tasks.map((task) => {
				if (task.id === id) {
					return {
						...task,
						title,
					};
				}
				return task;
			})
		);
	}

	function clearCompleted() {
		setTasks(tasks.filter((task) => !task.completed));
	}

	function filterTasks() {
		switch (filter) {
			case "active":
				return tasks.filter((task) => !task.completed);
			case "completed":
				return tasks.filter((task) => task.completed);
			default:
				return tasks;
		}
	}

	const filteredTasks = filterTasks();
	const remainingTasks = tasks.filter((task) => !task.completed);

	return (
		<div className="todoapp">
			<Header title="todos">
				<NewTaskForm onAddTask={createTask} />
			</Header>
			<main className="main">
				<TaskList
					tasks={filteredTasks}
					onDelete={deleteTask}
					onToggle={toggleTask}
					onUpdate={updateTask}
				/>
			</main>
			<Footer
				tasksNumber={remainingTasks.length}
				onClearCompleted={clearCompleted}
			>
				<TasksFilter filter={filter} onFilterChange={(f) => setFilter(f)} />
			</Footer>
		</div>
	);
}

export default App;
