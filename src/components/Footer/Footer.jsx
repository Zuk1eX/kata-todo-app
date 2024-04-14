import PropTypes from "prop-types";
import "./Footer.css";

export function Footer({ tasksNumber, onClearCompleted, children }) {
	return (
		<footer className="footer">
			<span className="todo-count">{tasksNumber} items left</span>
			{children}
			<button className="clear-completed" onClick={onClearCompleted}>
				Clear completed
			</button>
		</footer>
	);
}

Footer.defaultProps = {
	tasksNumber: 0,
	onClearCompleted: () => {},
};

Footer.propTypes = {
	tasksNumber: PropTypes.number,
	onClearCompleted: PropTypes.func,
	children: PropTypes.node,
};
