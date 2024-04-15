import PropTypes from "prop-types";
import "./Header.css";

export function Header({ title, children }) {
	return (
		<header className="header">
			<h1>{title}</h1>
			{children}
		</header>
	);
}

Header.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.node,
};
