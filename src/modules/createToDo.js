import { intlFormatDistance } from "date-fns"
import events from "./events"

export const allTasks = []

// initial render
allTasks.forEach(el => _render(el))

events.on('newValidTask', (NewTodo) => {
  allTasks.push(NewTodo)
  _render(NewTodo)
})


const allTasksDiv = document.querySelector('.allContent')
const todayDiv = document.querySelector('.todayContent')
const upcomingDiv = document.querySelector('.upcomingContent')
const importantDiv = document.querySelector('.importantContent')

// render the tasks
export function _render(el) {
  function createTaskNode() {
    const newTask = document.createElement('div')
    newTask.setAttribute('class', el.priority + ' task')

    // checkbox
    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.setAttribute('id', el.title + 'check')
    el.checked = checkbox.value
    
    // wrapper for title, description, and due date
    const taskWrapper = document.createElement('div')

    // title
    const taskTitle = document.createElement('h4')
    taskTitle.innerText = el.title

    // description
    const taskDescription = document.createElement('p')
    taskDescription.innerText = el.description

    // due date
    const taskDueDate = document.createElement('p')
    taskDueDate.setAttribute('class', 'dueDate_p')
    taskDueDate.innerHTML = new Date(el.dueDate).toLocaleDateString('us-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })

    // create the priority and it's styling
    const taskPriority = document.createElement('p')
    taskPriority.setAttribute('class', 'taskPriorityShow')
    taskPriority.innerText = el.priority.slice(0, -1).toUpperCase()
    switch (el.priority.slice(0, -1)) {
      case 'low':
        taskPriority.style.color = 'rgb(13, 150, 13)'
        break
      case 'medium':
        taskPriority.style.color = 'rgba(0, 191, 255, 0.888)'
        break
      case 'high':
        taskPriority.style.color = 'red'
        break
    }

    // append the created elements
    taskWrapper.appendChild(taskTitle)
    taskWrapper.appendChild(taskDescription)
    taskWrapper.appendChild(taskDueDate)

    newTask.appendChild(checkbox)
    newTask.appendChild(taskWrapper)
    newTask.appendChild(taskPriority)

    return newTask
  }

  // check for the date and if a task should be put in the today section or upcoming
  const currentDistance = intlFormatDistance(new Date(el.dueDate), new Date, { unit: 'day' }).split(' ')

  el.overdue = false
  if((currentDistance[0] === 'in' && currentDistance[1] > 0 && 
  currentDistance[1] < 8 && currentDistance[2] === 'days') || currentDistance[0] === 'tomorrow') {
    upcomingDiv.appendChild(createTaskNode())
  } else if (currentDistance[0] === 'yesterday' || currentDistance[2] === 'ago') {
    el.overdue = true
  } else {
    todayDiv.appendChild(createTaskNode())
  }
  

  if (el.priority.slice(0, -1).toUpperCase() === 'HIGH') {
    importantDiv.appendChild(createTaskNode())
  }

  allTasksDiv.appendChild(createTaskNode())
}