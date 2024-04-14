import PropTypes from "prop-types";
import { Task } from "../Task/Task";
import "./TaskList.css";

export function TaskList({ tasks, ...props }) {
	return (
		<ul className="todo-list">
			{tasks.map((task) => (
				<Task key={task.id} task={task} {...props} />
			))}
		</ul>
	);
}

TaskList.defaultProps = {
	tasks: [],
};

TaskList.propTypes = {
	tasks: PropTypes.array,
};
