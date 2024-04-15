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

TaskList.propTypes = {
	tasks: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
			completed: PropTypes.bool.isRequired,
			created: PropTypes.instanceOf(Date).isRequired,
		})
	).isRequired,
};
