import { intlFormatDistance } from "date-fns"
import events from "./events"


// sort the tasks
export const allTasks = []
export const Today = []
export const Upcoming = []
export const Important = []
export const overdue = []


events.on('newValidTask', (NewTodo) => {

  const newTask = document.createElement('div')
  newTask.setAttribute('class', NewTodo.priority + ' task')

  const checkbox = document.createElement('input')
  checkbox.setAttribute('type', 'checkbox')
  checkbox.setAttribute('id', NewTodo.title + 'check')
  NewTodo.checked = checkbox.value
  
  const taskWrapper = document.createElement('div')

  const taskTitle = document.createElement('h4')
  taskTitle.innerText = NewTodo.title

  const taskDescription = document.createElement('p')
  taskDescription.innerText = NewTodo.description

  const taskDueDate = document.createElement('p')
  taskDueDate.setAttribute('class', 'dueDate_p')
  taskDueDate.innerHTML = new Date(NewTodo.dueDate).toLocaleDateString('us-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })

  const taskPriority = document.createElement('p')
  taskPriority.setAttribute('class', 'taskPriorityShow')
  taskPriority.innerText = NewTodo.priority.slice(0, -1).toUpperCase()
  switch (NewTodo.priority.slice(0, -1)) {
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

  taskWrapper.appendChild(taskTitle)
  taskWrapper.appendChild(taskDescription)
  taskWrapper.appendChild(taskDueDate)

  newTask.appendChild(checkbox)
  newTask.appendChild(taskWrapper)
  newTask.appendChild(taskPriority)
  
  // emit the changes for the displayController
  const currentDistance = intlFormatDistance(new Date(NewTodo.dueDate), new Date, { unit: 'day' }).split(' ')

  if((currentDistance[0] === 'in' && currentDistance[1] > 0 && 
      currentDistance[1] < 8 && currentDistance[2] === 'days') || currentDistance[0] === 'tomorrow') {
    Upcoming.push(newTask)
    events.emit('upcomingChanged', newTask)
  } else if (currentDistance[0] === 'yesterday' || currentDistance[2] === 'ago') {
    overdue.push(newTask)
    events.emit('overdueChanged', newTask)
  } else {
    Today.push(newTask)
    events.emit('todayChanged', Today)
  }

  allTasks.push(newTask)
  events.emit('allTasksChanged', newTask)

  if (NewTodo.priority.slice(0, -1).toUpperCase() === 'HIGH') {
    Important.push(newTask)
    events.emit('importantChanged', newTask)
  }
})