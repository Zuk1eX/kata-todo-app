export default function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: Date.now(),
          title: action.title,
          completed: false,
          created: new Date(),
        },
      ]
    }
    case 'deleted': {
      return tasks.filter((task) => task.id !== action.id)
    }
    case 'toggled': {
      return tasks.map((task) => {
        if (task.id === action.id) {
          return {
            ...task,
            completed: !task.completed,
          }
        }
        return task
      })
    }
    case 'updated': {
      return tasks.map((task) => {
        if (task.id === action.id) {
          return {
            ...task,
            title: action.title,
          }
        }
        return task
      })
    }
    case 'cleared': {
      return tasks.filter((task) => !task.completed)
    }
    default:
      return tasks
  }
}
