import PropTypes from 'prop-types'
import Task from '../Task/Task'
import './TaskList.css'

export default function TaskList({ tasks, onDelete, onToggle, onUpdate }) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} onUpdate={onUpdate} />
      ))}
    </ul>
  )
}

TaskList.defaultProps = {
  onDelete: () => {},
  onToggle: () => {},
  onUpdate: () => {},
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      created: PropTypes.number.isRequired,
      updated: PropTypes.number.isRequired,
      deadline: PropTypes.number.isRequired,
      isActive: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func,
  onToggle: PropTypes.func,
  onUpdate: PropTypes.func,
}
