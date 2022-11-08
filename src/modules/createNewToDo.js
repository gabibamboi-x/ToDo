import greenFlag from "../Images/greenFlag.png"
import blueFlag from "../Images/blueFlag.png"
import redFlag from "../Images/redFlag.png"
import due from "../Images/dueDate.png"
import bin from "../Images/bin.png"
import { intlFormatDistance } from "date-fns"


export function createTaskNode(el) {
  // create the task node and give them class names 
  // with their index number in the array
  // this will help in deleting the task later on
  const newTask = document.createElement('div')
  newTask.setAttribute('class', 't' + el.uniqueID + ' task')

  // create checkbox
  const checkbox = document.createElement('input')
  checkbox.setAttribute('type', 'checkbox')
  checkbox.setAttribute('class', 'check')
  
  // wrapper for title, description, and due date
  const taskWrapper = document.createElement('div')

  // title
  const taskTitle = document.createElement('h3')
  taskTitle.innerText = el.title

  // description
  const taskDescription = document.createElement('p')
  taskDescription.innerText = el.description

  // due date div 
  const dueDiv = document.createElement('div')
  dueDiv.setAttribute('class', 'dueContent')

  const dueIcon = new Image
  dueIcon.src = due

  // due date
  const taskDueDate = document.createElement('p')
  taskDueDate.setAttribute('class', 'dueDate_p')

  // format the date
  const date = intlFormatDistance(new Date(el.dueDate), new Date, { unit: 'day' })
  if (date === 'yesterday' || date.split(' ')[2] === 'ago') {
    taskDueDate.innerHTML = 'overdue'
    taskDueDate.style.color = '#FF4869'
  } else {
    taskDueDate.innerHTML = 'Due ' + date
  }

  dueDiv.appendChild(dueIcon)
  dueDiv.appendChild(taskDueDate)

  const optionDiv = document.createElement('div')
  optionDiv.setAttribute('class', 'optionDiv')

  const binIcon = new Image
  binIcon.src = bin
  binIcon.style.opacity = '0.7'
  binIcon.setAttribute('class', 'bin')

  // create the priority and it's styling
  const taskPriority = document.createElement('p')
  taskPriority.setAttribute('class', 'taskPriorityShow')
  // set the flag color based on priority
  switch (el.priority.slice(0, -1)) {
    case 'low':
      const green = new Image
      green.src = greenFlag
      taskPriority.appendChild(green)
      break
    case 'medium':
      const blue = new Image
      blue.src = blueFlag
      taskPriority.appendChild(blue)
      break
    case 'high':
      const red = new Image
      red.src = redFlag
      taskPriority.appendChild(red)
      break
  }

  optionDiv.appendChild(taskPriority)
  optionDiv.appendChild(binIcon)

  // append the created elements
  taskWrapper.appendChild(taskTitle)
  taskWrapper.appendChild(taskDescription)
  taskWrapper.appendChild(dueDiv)

  newTask.appendChild(checkbox)
  newTask.appendChild(taskWrapper)
  newTask.appendChild(optionDiv)

  return newTask
}