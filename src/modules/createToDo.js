import events from "./events"

events.on('newValidTask', (NewTodo) => {

  const taskView = document.querySelector('.taskview')

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
  taskDueDate.innerText = NewTodo.dueDate
  
  const taskPriority = document.createElement('p')
  taskPriority.innerText = NewTodo.priority.slice(0, -1).toUpperCase()

  taskWrapper.appendChild(taskTitle)
  taskWrapper.appendChild(taskDescription)
  taskWrapper.appendChild(taskDueDate)

  newTask.appendChild(checkbox)
  newTask.appendChild(taskWrapper)
  newTask.appendChild(taskPriority)
  
  taskView.appendChild(newTask)
})