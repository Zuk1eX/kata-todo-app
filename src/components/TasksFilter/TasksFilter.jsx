import PropTypes from "prop-types";
import "./TasksFilter.css";

export function TasksFilter({ filter, onFilterChange }) {
	const filters = ["All", "Active", "Completed"];

	return (
		<ul className="filters">
			{filters.map((f) => (
				<li key={f}>
					<button
						className={f.toLowerCase() === filter ? "selected" : null}
						onClick={() => onFilterChange(f.toLowerCase())}
					>
						{f}
					</button>
				</li>
			))}
		</ul>
	);
}

TasksFilter.defaultProps = {
	filter: "all",
	onFilterChange: () => {},
};

TasksFilter.propTypes = {
	filter: PropTypes.oneOf(["all", "active", "completed"]),
	onFilterChange: PropTypes.func,
};
