import { useCallback, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import './Task.css'
import { diffBetweenDates, formatDate } from '../../services/utils'
import { useTimer, useEscapeHandler, useClickOutside } from '../../hooks/index'
import Timer from '../Timer/Timer'

export default function Task({ task, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [statusClassName, setStatusClassName] = useState(task.completed ? 'completed' : null)
  const [title, setTitle] = useState(task.title)

  const datesToDiff = task.isActive ? [Date.now(), task.deadline] : [task.updated, task.deadline]
  const time = diffBetweenDates(...datesToDiff)

  const { minutesLeft, secondsLeft, resetTimer } = useTimer(time, task.deadline, task.isActive)

  const handleEscape = useCallback(() => {
    if (isEditing) {
      setIsEditing(false)
      setStatusClassName(null)
      setTitle(task.title)
    }
  }, [isEditing, task.title])

  const taskRef = useRef(null)
  useEscapeHandler(taskRef, handleEscape)
  useClickOutside(taskRef, handleEscape)

  function handleToggle() {
    setStatusClassName(task.completed ? null : 'completed')
    onToggle(task.id)
    resetTimer()
  }

  function handleEdit() {
    if (task.completed) return
    setIsEditing(true)
    setStatusClassName('editing')
  }

  function handlePlay() {
    if (task.isActive || task.completed) return
    const convertedTime = (minutesLeft * 60 + secondsLeft) * 1000
    const newDeadline = Date.now() + convertedTime
    onUpdate(task.id, title, newDeadline, true)
  }

  function handlePause() {
    if (!task.isActive || task.completed) return
    onUpdate(task.id, title, task.deadline, false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return
    onUpdate(task.id, title, task.deadline, task.isActive)
    setIsEditing(false)
    setStatusClassName(null)
  }

  return (
    <li className={statusClassName} ref={taskRef}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          id={`toggle-${task.id}`}
        />
        <label htmlFor={`toggle-${task.id}`}>
          <span className="title">{task.title}</span>
          <Timer
            isActive={task.isActive}
            minutesLeft={minutesLeft}
            secondsLeft={secondsLeft}
            onPlay={() => handlePlay()}
            onPause={() => handlePause()}
          />
          <span className="description">{formatDate(task.created)}</span>
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
    created: PropTypes.number.isRequired,
    updated: PropTypes.number.isRequired,
    deadline: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
  }).isRequired,
  onToggle: PropTypes.func,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
}
