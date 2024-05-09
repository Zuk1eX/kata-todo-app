import { useState } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

export default function NewTaskForm({ onAddTask }) {
  const [title, setTitle] = useState('')
  const [minutes, setMinutes] = useState(5)
  const [seconds, setSeconds] = useState(0)

  const timer = minutes * 60 + seconds

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return

    const deadline = Date.now() + timer * 1000
    onAddTask(title.trim(), deadline)
    setTitle('')
    setMinutes(5)
    setSeconds(0)
  }

  function handleMinutes(value) {
    if (Number.isNaN(value) || value > 43200) return
    setMinutes(value)
  }

  function handleSeconds(value) {
    if (Number.isNaN(value) || value > 59) return
    setSeconds(value)
  }

  return (
    <form className="new-todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        className="new-todo-form__timer"
        placeholder="Min"
        value={minutes}
        onChange={(e) => handleMinutes(+e.target.value)}
      />
      <input
        type="text"
        className="new-todo-form__timer"
        placeholder="Sec"
        value={seconds}
        onChange={(e) => handleSeconds(+e.target.value)}
      />
      <button type="submit" />
    </form>
  )
}

NewTaskForm.defaultProps = {
  onAddTask: () => {},
}

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func,
}
