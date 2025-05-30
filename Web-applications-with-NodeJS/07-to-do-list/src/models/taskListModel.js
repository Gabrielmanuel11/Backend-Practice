let taskLists = [
  { id: '1', title: 'Study', tasks: [{ id: '1', title: 'To study Node', completed: false }] },
  { id: '2', title: 'House tasks', tasks: [] },
  { id: '3', title: 'Work tasks', tasks: [] }
]

module.exports = {
  getAllTaskLists: () => {
    return taskLists
  },

  getTaskListById: (id) => {
    return taskLists.find(list => list.id === id)
  },

  createList: (title) => {
    const newList = {
      id: Math.floor(Math.random() * 99999999).toString(),
      title: title,
      tasks: []
    }
    return newList
  },

  saveList: (taskList) => {
    if (taskList.title === '') throw new Error('List title can not be empty.')
    taskLists.push(taskList)
  },

  deleteList: (listId) => {
    const listIndex = taskLists.findIndex(list => list.id === listId)
    taskLists.splice(listIndex, 1)
  },

  addTask: (listId, taskTitle) => {
    const newTask = {
      id: Math.floor(Math.random() * 99999999).toString(),
      title: taskTitle,
      completed: false
    }
    taskLists.find(list => list.id === listId).tasks.push(newTask)
  },

  completeTask: (listId, taskId) => {
    const taskList = taskLists.find(list => list.id === listId)
    const task = taskList.tasks.find(task => task.id === taskId)
    task.completed = true
  },

  undoTask: (listId, taskId) => {
    const taskList = taskLists.find(list => list.id === listId)
    const task = taskList.tasks.find(task => task.id === taskId)
    task.completed = false
  }
}