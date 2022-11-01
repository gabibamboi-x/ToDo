import events from "./events"
import { allTasks, Today, Upcoming, Important, overdue } from "./createToDo.js"

const taskView = document.querySelector('.taskview')
const allTasksDiv = document.createElement('div')

events.on('allTasksChanged', (newTask) => {
  allTasksDiv.append(newTask)
  taskView.append(allTasksDiv)
})