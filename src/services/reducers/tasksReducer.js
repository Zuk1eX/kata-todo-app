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
          updated: new Date(),
          deadline: action.deadline,
          isActive: true,
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
            updated: new Date(),
            deadline: new Date(),
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
            updated: new Date(),
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
