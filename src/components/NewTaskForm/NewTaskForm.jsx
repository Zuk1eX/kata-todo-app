import { useState } from "react";
import PropTypes from "prop-types";
import "./NewTaskForm.css";

export function NewTaskForm({ onAddTask }) {
	const [title, setTitle] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		if (!title) return;
		onAddTask(title);
		setTitle("");
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				className="new-todo"
				placeholder="What needs to be done?"
				autoFocus
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
		</form>
	);
}

NewTaskForm.defaultProps = {
	onAddTask: () => {},
};

NewTaskForm.propTypes = {
	onAddTask: PropTypes.func,
};
