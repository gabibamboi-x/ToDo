import greenFlag from "../Images/greenFlag.png"
import blueFlag from "../Images/blueFlag.png"
import redFlag from "../Images/redFlag.png"

export const allTasks = []

export function createTaskNode(el) {
  const newTask = document.createElement('div')
  newTask.setAttribute('class', 'index' + (allTasks.length - 1) + ' task')

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

  // append the created elements
  taskWrapper.appendChild(taskTitle)
  taskWrapper.appendChild(taskDescription)
  taskWrapper.appendChild(taskDueDate)

  newTask.appendChild(checkbox)
  newTask.appendChild(taskWrapper)
  newTask.appendChild(taskPriority)

  return newTask
}