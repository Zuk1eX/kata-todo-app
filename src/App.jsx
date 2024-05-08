import { useReducer, useState } from 'react'
import './App.css'
import NewTaskForm from './components/NewTaskForm/NewTaskForm'
import TaskList from './components/TaskList/TaskList'
import Footer from './components/Footer/Footer'
import TasksFilter from './components/TasksFilter/TasksFilter'
import Header from './components/Header/Header'
import tasksReducer from './services/reducers/tasksReducer'

function App() {
  const [tasks, dispatch] = useReducer(tasksReducer, [])
  const [filter, setFilter] = useState('all')

  const createTask = (title, deadline) => dispatch({ type: 'added', title, deadline })
  const deleteTask = (id) => dispatch({ type: 'deleted', id })
  const toggleTask = (id) => dispatch({ type: 'toggled', id })
  const updateTask = (id, title, deadline, isActive) => dispatch({ type: 'updated', id, title, deadline, isActive })
  const clearCompleted = () => dispatch({ type: 'cleared' })

  function filterTasks() {
    switch (filter) {
      case 'active':
        return tasks.filter((task) => !task.completed)
      case 'completed':
        return tasks.filter((task) => task.completed)
      default:
        return tasks
    }
  }

  const filteredTasks = filterTasks()
  const remainingTasks = tasks.filter((task) => !task.completed)

  return (
    <div className="todoapp">
      <Header title="todos">
        <NewTaskForm onAddTask={createTask} />
      </Header>
      <main className="main">
        <TaskList tasks={filteredTasks} onDelete={deleteTask} onToggle={toggleTask} onUpdate={updateTask} />
      </main>
      <Footer tasksNumber={remainingTasks.length} onClearCompleted={clearCompleted}>
        <TasksFilter filter={filter} onFilterChange={(f) => setFilter(f)} />
      </Footer>
    </div>
  )
}

export default App
