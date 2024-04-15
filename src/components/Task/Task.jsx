import { useState } from 'react'
import PropTypes from 'prop-types'
import './Task.css'
import formatDate from '../../services/utils'

export default function Task({ task, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [statusClassName, setStatusClassName] = useState(task.completed ? 'completed' : null)
  const [title, setTitle] = useState(task.title)

  function handleToggle() {
    setStatusClassName(task.completed ? null : 'completed')
    onToggle(task.id)
  }

  function handleEdit() {
    if (task.completed) return
    setIsEditing(true)
    setStatusClassName('editing')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return
    onUpdate(task.id, title)
    setIsEditing(false)
    setStatusClassName(null)
  }

  return (
    <li className={statusClassName}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          id={`toggle-${task.id}`}
        />
        <label htmlFor={`toggle-${task.id}`}>
          <span className="description">{task.title}</span>
          <span className="created">{formatDate(task.created)}</span>
        </label>
        <button
          type="button"
          className={`icon ${!task.completed ? 'icon-edit' : 'icon-edit--not-allowed'}`}
          onClick={handleEdit}
        />
        <button type="button" className="icon icon-destroy" onClick={() => onDelete(task.id)} />
      </div>
      {isEditing && (
        <form onSubmit={handleSubmit}>
          <input type="text" className="edit" value={title} onChange={(e) => setTitle(e.target.value)} />
        </form>
      )}
    </li>
  )
}

Task.defaultProps = {
  onToggle: () => {},
  onDelete: () => {},
  onUpdate: () => {},
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    created: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  onToggle: PropTypes.func,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
}
