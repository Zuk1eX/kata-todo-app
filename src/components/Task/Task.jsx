import { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import './Task.css'
import formatDate from '../../services/utils'

export default function Task({ task, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [statusClassName, setStatusClassName] = useState(task.completed ? 'completed' : null)
  const [title, setTitle] = useState(task.title)

  let [minutes, seconds] = [0, 0]

  function getTimePartsBetween(date1, date2) {
    const diff = (date2 - date1) / 1000
    return [Math.floor(diff / 60), Math.floor(diff) % 60]
  }

  if (task.isActive) {
    ;[minutes, seconds] = getTimePartsBetween(new Date(), task.deadline)
  } else {
    ;[minutes, seconds] = getTimePartsBetween(task.updated, task.deadline)
  }

  const [minutesLeft, setMinutesLeft] = useState(minutes)
  const [secondsLeft, setSecondsLeft] = useState(seconds)

  const taskRef = useRef(null)

  useEffect(() => {
    if (!isEditing) return null

    function handleKeydown(e) {
      if (e.key === 'Escape') {
        setIsEditing(false)
        setStatusClassName(null)
        setTitle(task.title)
      }
    }

    const taskEl = taskRef.current
    taskEl.addEventListener('keydown', handleKeydown)

    return () => {
      taskEl.removeEventListener('keydown', handleKeydown)
    }
  }, [isEditing, task.title])

  function resetTimer() {
    setMinutesLeft(0)
    setSecondsLeft(0)
  }

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
    const newDeadline = new Date(Date.now() + convertedTime + 50)
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

  const updateTimer = useCallback(
    (timerId) => {
      if (task.deadline < Date.now() || !task.isActive) {
        clearInterval(timerId)
        return
      }

      const [m, s] = getTimePartsBetween(Date.now(), task.deadline)
      setMinutesLeft(m)
      setSecondsLeft(s)
    },
    [task.deadline, task.isActive]
  )

  useEffect(() => {
    const timer = setInterval(() => {
      updateTimer(timer)
    }, 1000)

    return () => clearInterval(timer)
  }, [updateTimer])

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
          <span className="description description--timer">
            <button
              type="button"
              className="icon icon-play"
              onClick={handlePlay}
              disabled={!minutesLeft && !secondsLeft}
            />
            <button
              type="button"
              className="icon icon-pause"
              onClick={handlePause}
              disabled={!minutesLeft && !secondsLeft}
            />
            {`${minutesLeft}:${secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}`}
          </span>
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
    created: PropTypes.instanceOf(Date).isRequired,
    updated: PropTypes.instanceOf(Date).isRequired,
    deadline: PropTypes.instanceOf(Date).isRequired,
    isActive: PropTypes.bool.isRequired,
  }).isRequired,
  onToggle: PropTypes.func,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
}
