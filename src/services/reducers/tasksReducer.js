export default function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: Date.now(),
          title: action.title,
          completed: false,
          created: Date.now(),
          updated: Date.now(),
          deadline: action.deadline,
          isActive: false,
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
            updated: Date.now(),
            deadline: Date.now(),
            isActive: false,
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
            updated: Date.now(),
            deadline: action.deadline,
            isActive: action.isActive,
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
